<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <h3 class="fw-bold m-0">Archivio File</h3>
      </div>
      <div class="card-toolbar">
        <input ref="giornalinoInputRef" type="file" @change="handleGiornalinoUpload" class="d-none" />
        <div class="d-flex gap-2">
          <a v-if="giornalinoFile" :href="giornalinoFile.FileUrl" download class="btn btn-info">
            <KTIcon icon-name="arrow-down" icon-class="fs-2" />
            Scarica Giornalino
          </a>
          <button type="button" class="btn btn-success" @click="triggerGiornalinoInput">
            <KTIcon icon-name="file-up" icon-class="fs-2" />
            Aggiorna Giornalino
          </button>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <div class="row g-5 g-xl-8">
        <!-- Cartella Gestione Partner -->
        <div class="col-md-4">
          <div class="folder-card" @click="openFolderModal('Gestione Partner')">
            <div class="folder-icon">
              <KTIcon icon-name="folder" icon-class="fs-2x text-primary" />
            </div>
            <div class="folder-title">Gestione Partner</div>
            <div class="folder-count">{{ getFolderFileCount('Gestione Partner') }} file</div>
          </div>
        </div>

        <!-- Cartella Modulistica -->
        <div class="col-md-4">
          <div class="folder-card" @click="openFolderModal('Modulistica')">
            <div class="folder-icon">
              <KTIcon icon-name="folder" icon-class="fs-2x text-primary" />
            </div>
            <div class="folder-title">Modulistica</div>
            <div class="folder-count">{{ getFolderFileCount('Modulistica') }} file</div>
          </div>
        </div>

        <!-- Cartella Social -->
        <div class="col-md-4">
          <div class="folder-card" @click="openFolderModal('Social')">
            <div class="folder-icon">
              <KTIcon icon-name="folder" icon-class="fs-2x text-primary" />
            </div>
            <div class="folder-title">Social</div>
            <div class="folder-count">{{ getFolderFileCount('Social') }} file</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modale per visualizzare i file della cartella -->
    <div class="modal fade" id="folderModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="fw-bold">{{ currentFolder }}</h2>
            <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between align-items-center mb-5">
              <div class="d-flex align-items-center position-relative">
                <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
                <input type="text" v-model="searchFiles" @input="searchFilesInFolder()"
                  class="form-control form-control-solid w-250px ps-15" placeholder="Ricerca file" />
              </div>
              <div class="d-flex gap-2">
                <input ref="fileInputRef" type="file" multiple @change="handleFileUpload" class="d-none" />
                <button type="button" class="btn btn-primary" @click="triggerFileInput">
                  <KTIcon icon-name="plus" icon-class="fs-2" />
                  Aggiungi File
                </button>
              </div>
            </div>

            <div v-if="loading" class="text-center py-10">
              <span class="spinner-border spinner-border-lg"></span>
            </div>

            <div v-else-if="filteredFolderFiles.length === 0" class="text-center py-10">
              <p class="text-muted">Nessun file presente in questa cartella</p>
            </div>

            <div v-else class="table-responsive">
              <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr class="fw-bold text-muted">
                    <th class="min-w-200px">Nome File</th>
                    <th class="min-w-150px text-end">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="file in filteredFolderFiles" :key="file.Id">
                    <td>
                      <div class="d-flex align-items-center">
                        <KTIcon icon-name="file" icon-class="fs-2 text-primary me-3" />
                        <span class="text-gray-800 fw-semobold">{{ getFileName(file.FileName) }}</span>
                      </div>
                    </td>
                    <td class="text-end">
                      <a class="btn btn-light-info btn-sm me-2" :href="file.FileUrl" download>
                        <KTIcon icon-name="arrow-down" icon-class="fs-2" />
                        Scarica
                      </a>
                      <button @click="deleteItem(file.Id, currentFolder)" class="btn btn-light-danger btn-sm">
                        <KTIcon icon-name="trash" icon-class="fs-2" />
                        Elimina
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Documentation, getDocumentations, uploadFile, deleteDocumentation } from "@/core/data/documentations";
import Swal from "sweetalert2";
import { defineComponent, ref, onMounted, computed } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import { Modal } from "bootstrap";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "Documentations",
  setup() {
    const store = useAuthStore();
    const loading = ref<boolean>(true);
    const allDocuments = ref<Array<Documentation>>([]);
    const currentFolder = ref<string>("");
    const searchFiles = ref<string>("");
    const fileInputRef = ref<HTMLInputElement | null>(null);
    const giornalinoInputRef = ref<HTMLInputElement | null>(null);
    let folderModal: Modal | null = null;

    const folders = ["Gestione Partner", "Modulistica", "Social"];

    const formData = ref<Documentation>({
      File: null,
      FileName: "",
      FolderName: "",
    });

    // Mappa il nome della cartella UI al nome da usare nel backend/database
    const getFolderNameForBackend = (folderName: string): string => {
      if (folderName === "Gestione Partner") {
        return "Partner";
      } else if (folderName === "Modulistica") {
        return "Moduli";
      }
      return folderName; // "Social" rimane "Social"
    };

    const getFolderFiles = (folderName: string): Array<Documentation> => {
      return allDocuments.value.filter(doc => {
        const fileName = doc.FileName || "";
        // Estrae la prima parola prima dello slash "/"
        const parts = fileName.split("/");
        const firstPart = parts.length > 1 ? parts[0].toLowerCase() : "";
        
        if (folderName === "Modulistica") {
          // I file devono iniziare con "Moduli/"
          return firstPart === "moduli";
        } else if (folderName === "Gestione Partner") {
          // I file devono iniziare con "Partner/"
          return firstPart === "partner";
        } else if (folderName === "Social") {
          // I file devono iniziare con "Social/"
          return firstPart === "social";
        }
        return false;
      });
    };

    const filteredFolderFiles = computed(() => {
      const files = getFolderFiles(currentFolder.value);
      if (!searchFiles.value) {
        return files;
      }
      return files.filter(file => {
        const fileName = getFileName(file.FileName || "");
        return fileName.toLowerCase().includes(searchFiles.value.toLowerCase());
      });
    });

    const getFolderFileCount = (folderName: string): number => {
      return getFolderFiles(folderName).length;
    };

    const getFileName = (fileName: string): string => {
      // Estrae solo la parte dopo lo slash "/" (il nome del file senza il percorso)
      const parts = fileName.split("/");
      return parts.length > 1 ? parts[1] : fileName;
    };

    // Trova il file del giornalino se esiste
    const giornalinoFile = computed(() => {
      return allDocuments.value.find(doc => {
        const fileName = (doc.FileName || "").toLowerCase();
        return fileName === "giornalino/rivista-thinkhome.pdf";
      });
    });

    const getItems = async () => {
      loading.value = true;
      const documents = await getDocumentations();
      if (documents) {
        allDocuments.value = documents;
      }
      loading.value = false;
    };

    const openFolderModal = (folderName: string) => {
      currentFolder.value = folderName;
      searchFiles.value = "";
      if (!folderModal) {
        const modalElement = document.getElementById("folderModal");
        if (modalElement) {
          folderModal = new Modal(modalElement);
        }
      }
      folderModal?.show();
    };

    const triggerFileInput = () => {
      fileInputRef.value?.click();
    };

    const triggerGiornalinoInput = () => {
      giornalinoInputRef.value?.click();
    };

    const handleFileUpload = async (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input?.files && input.files.length > 0) {
        loading.value = true;
        const files = Array.from(input.files);
        
        for (const file of files) {
          // Determina il percorso in base alla cartella
          let folderPath = "";
          if (currentFolder.value === "Modulistica") {
            folderPath = "Moduli";
          } else if (currentFolder.value === "Gestione Partner") {
            folderPath = "Partner";
          } else if (currentFolder.value === "Social") {
            folderPath = "Social";
          }
          
          // Crea il percorso completo: FolderPath/NomeFile
          const fileNameWithPath = folderPath ? `${folderPath}/${file.name}` : file.name;
          
          formData.value = {
            File: file,
            FileName: fileNameWithPath,
            FolderName: getFolderNameForBackend(currentFolder.value),
          };
          await uploadFile(formData.value);
        }

        const error = store.errors;
        if (!error) {
          await getItems();
          Swal.fire({
            text: "File caricati con successo!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } else {
          Swal.fire({
            text: "Errore durante il caricamento dei file. Riprova.",
            icon: "error",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
        loading.value = false;
        if (input) {
          input.value = "";
        }
      }
    };

    const handleGiornalinoUpload = async (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input?.files && input.files.length > 0) {
        loading.value = true;
        const file = input.files[0];
        
        // Cerca se esiste già un file "giornalino/rivista-thinkhome.pdf"
        const existingGiornalino = allDocuments.value.find(doc => {
          const fileName = (doc.FileName || "").toLowerCase();
          return fileName === "giornalino/rivista-thinkhome.pdf";
        });

        // Se esiste, eliminalo prima di caricare il nuovo
        if (existingGiornalino && existingGiornalino.Id) {
          await deleteDocumentation(existingGiornalino.Id, "giornalino");
        }

        // Forza il nome del file a "giornalino/rivista-thinkhome.pdf"
        // Rinomina il file per forzare il nome
        const renamedFile = new File([file], "rivista-thinkhome.pdf", { type: file.type });
        const fileNameWithPath = "giornalino/rivista-thinkhome.pdf";
        
        formData.value = {
          File: renamedFile,
          FileName: fileNameWithPath,
          FolderName: "giornalino",
        };
        
        await uploadFile(formData.value);

        const error = store.errors;
        if (!error) {
          await getItems();
          Swal.fire({
            text: "Giornalino aggiornato con successo!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } else {
          Swal.fire({
            text: "Errore durante l'aggiornamento del giornalino. Riprova.",
            icon: "error",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
        loading.value = false;
        if (input) {
          input.value = "";
        }
      }
    };

    const searchFilesInFolder = () => {
      // La ricerca è gestita dal computed filteredFolderFiles
    };

    const deleteItem = async (id: number, folderName: string) => {
      Swal.fire({
        text: "Confermare l'eliminazione?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          loading.value = true;
          await deleteDocumentation(id, getFolderNameForBackend(folderName));
          await getItems();
          loading.value = false;
          Swal.fire({
            text: "File eliminato con successo!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      });
    };

    onMounted(async () => {
      await getItems();
    });

    return {
      loading,
      currentFolder,
      searchFiles,
      filteredFolderFiles,
      fileInputRef,
      giornalinoInputRef,
      giornalinoFile,
      getFolderFileCount,
      getFileName,
      openFolderModal,
      triggerFileInput,
      triggerGiornalinoInput,
      handleFileUpload,
      handleGiornalinoUpload,
      searchFilesInFolder,
      deleteItem,
    };
  },
});
</script>