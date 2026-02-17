<template>
<div class="modal fade" id="kt_modal_scheda" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <!-- Header -->
      <div style="display: flex; align-items: center; width: 100%; justify-content: flex-start;">
        <img src="/src/pic5.png" alt="Logo" style="width: 100px; margin-left: 30px; margin-right: -120px;">
        <h2 class="fw-bold text-dark" style="flex: 1; text-align: center; margin: 0;">DOCUMENTAZIONE IMMOBILE</h2>
      </div>
      <!-- Body -->
      <div class="modal-body py-5 px-7 overflow-auto" style="max-height: 70vh;">
        <!-- Document Section -->
        <div class="document-section">
          
          <!-- Documento di Riconoscimento -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documento di riconoscimento</h4>
            <p class="text-muted fs-6 mb-3">(Carta d'Identità o Passaporto - se persona giuridica del legale rappresentante o del titolare)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="IdentificationDocument" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('IdentificationDocument')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('IdentificationDocument').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('IdentificationDocument')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Codice Fiscale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Codice Fiscale o Tessera Sanitaria</h4>
            <p class="text-muted fs-6 mb-3">(se persona giuridica del legale rappresentante o del titolare)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="TaxCodeOrHealthCard" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('TaxCodeOrHealthCard')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('TaxCodeOrHealthCard').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('TaxCodeOrHealthCard')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Estratto atto matrimonio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Estratto per riassunto dell'atto di matrimonio</h4>
            <p class="text-muted fs-6 mb-3">(con indicato il regime coniugale e patrimoniale o Certificato di stato libero o Certificato di unione civile)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="MarriageCertificateSummary" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('MarriageCertificateSummary')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('MarriageCertificateSummary').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('MarriageCertificateSummary')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Atto di provenienza -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto/i di provenienza</h4>
            <p class="text-muted fs-6 mb-3">(Acquisto, Successione + Accettazione eredità, Divisione, Donazione, Permuta, Decreto di Trasferimento, Sentenza, Usucapione, etc.)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadDeedOfOrigin" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('DeedOfOrigin')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('DeedOfOrigin').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('DeedOfOrigin')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Impianti -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Impianti: dichiarazione di conformità o di rispondenza</h4>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elettrico/elettronico</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadElectricalElectronicSystem" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('ElectricalElectronicSystem')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('ElectricalElectronicSystem').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('ElectricalElectronicSystem')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- idrico/sanitario</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadPlumbingSanitarySystem" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('PlumbingSanitarySystem')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('PlumbingSanitarySystem').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('PlumbingSanitarySystem')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- gas</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadGasSystem" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('GasSystem')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('GasSystem').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('GasSystem')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- riscaldamento/condizionamento</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadHeatingAirConditioningSystem" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('HeatingAirConditioningSystem')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('HeatingAirConditioningSystem').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('HeatingAirConditioningSystem')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- sollevamento</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadLiftingSystem" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('LiftingSystem')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('LiftingSystem').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('LiftingSystem')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- antincendio</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadFireSafetySystem" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('FireSafetySystem')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('FireSafetySystem').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('FireSafetySystem')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>
          </div>
          <!-- Libretto caldaia -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Libretto della caldaia</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadBoilerMaintenanceLog" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('BoilerMaintenanceLog')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('BoilerMaintenanceLog').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('BoilerMaintenanceLog')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Abitabilità/Agibilità -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Abitabilità / Agibilità</h4>
            <p class="text-muted fs-6 mb-3">(Certificato rilasciato dal Comune o Attestazione redatta dal Tecnico)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadHabitabilityCertificate" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('HabitabilityCertificate')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('HabitabilityCertificate').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('HabitabilityCertificate')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Certificato idoneità statica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di idoneità statica</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadStructuralIntegrityCertificate" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('StructuralIntegrityCertificate')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('StructuralIntegrityCertificate').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('StructuralIntegrityCertificate')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Relazione Tecnica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Relazione Tecnica Integrata di Conformità Edilizia e Catastale</h4>
            <p class="text-muted fs-6 mb-3">(comprenderà dati catastali completi, descrizione, titolarità, situazione edilizia con riepilogo dei titoli abilitanti, informazioni sull'agibilità/abitabilità, conformità edilizia e catastale, informazioni circa l'esistenza di un interesse culturale del bene ai sensi del D. Lgs. 42/04 ed attestazione conclusiva. Saranno allegati visura catastale e planimetria catastale)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadBuildingCadastralComplianceReport" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('BuildingCadastralComplianceReport')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('BuildingCadastralComplianceReport').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('BuildingCadastralComplianceReport')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Catasto -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Catasto:</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- visura e planimetria</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadLandRegistry" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('LandRegistry')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('LandRegistry').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('LandRegistry')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- estratto di mappa</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadCadastralMapExtract" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('CadastralMapExtract')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('CadastralMapExtract').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('CadastralMapExtract')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elaborato planimetrico con elenco subalterni</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadFloorPlanWithSubsidiaryUnits" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('FloorPlanWithSubsidiaryUnits')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('FloorPlanWithSubsidiaryUnits').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('FloorPlanWithSubsidiaryUnits')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>
          </div>
          <!-- APE -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Attestato di Certificazione/Prestazione Energetica (laddove previsto per legge)</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadEnergyPerformanceCertificate" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('EnergyPerformanceCertificate')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('EnergyPerformanceCertificate').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('EnergyPerformanceCertificate')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Visura ipocatastale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura ipocatastale</h4>
            <p class="text-muted fs-6 mb-3">(a verifica della titolarità immobiliare ed eventuali gravami)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadMortgageLienRegistrySearch" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('MortgageLienRegistrySearch')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('MortgageLienRegistrySearch').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('MortgageLienRegistrySearch')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Condominio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Condominio (indicare recapiti dell'amministratore):</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- regolamento</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadCondominiumBylaws" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('CondominiumBylaws')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('CondominiumBylaws').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('CondominiumBylaws')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- tabelle millesimali</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadMillesimalTables" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('MillesimalTables')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('MillesimalTables').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('MillesimalTables')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimo bilancio consuntivo e preventivo</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadLatestFinancialStatementAndBudget" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('LatestFinancialStatementAndBudget')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('LatestFinancialStatementAndBudget').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('LatestFinancialStatementAndBudget')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimi due verbali dell'assemblea condominiale</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadLastTwoCondominiumMeetingMinutes" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('LastTwoCondominiumMeetingMinutes')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('LastTwoCondominiumMeetingMinutes').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('LastTwoCondominiumMeetingMinutes')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- dichiarazione scritta e firmata dall'amministratore attestante l'avvenuto pagamento di tutte le spese condominiali e indicazione delle eventuali spese straordinarie deliberate e delle liti in corso</h5>
              <div class="mb-3">
                <button 
                  type="button" 
                  class="btn btn-sm btn-light-primary" 
                  title="Carica documenti" 
                  data-document-type="UploadSignedStatementFromAdministrator" 
                  @click="triggerFileInput" 
                  :disabled="loading">
                  <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                  Carica documenti
                </button>
              </div>
              <div v-if="hasSpecificDocuments('SignedStatementFromAdministrator')" class="documents-list-container">
                <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('SignedStatementFromAdministrator').length }})</label>
                <div class="documents-list">
                  <div v-for="doc in getSpecificDocsForType('SignedStatementFromAdministrator')" :key="doc.Id" class="document-item-generic">
                    <div class="document-info-generic">
                      <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                      <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                    </div>
                    <div class="document-actions-generic">
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-primary me-2" 
                        @click="downloadSpecificDoc(doc)"
                        title="Scarica documento">
                        <i class="bi bi-download"></i>
                      </button>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-light-danger" 
                        @click="deleteSpecificDoc(doc)"
                        title="Elimina documento">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
            </div>
          </div>
          <!-- Visura camerale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura camerale</h4>
            <p class="text-muted fs-6 mb-3">(solo se persona giuridica)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadChamberOfCommerceBusinessRegistrySearch" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('ChamberOfCommerceBusinessRegistrySearch')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('ChamberOfCommerceBusinessRegistrySearch').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('ChamberOfCommerceBusinessRegistrySearch')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Procura -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Procura speciale o generale</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di procuratore)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadPowerOfAttorney" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('PowerOfAttorney')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('PowerOfAttorney').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('PowerOfAttorney')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Certificato Urbanistico -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di Destinazione Urbanistica</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di terreni)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadUrbanPlanningComplianceCertificate" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('UrbanPlanningComplianceCertificate')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('UrbanPlanningComplianceCertificate').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('UrbanPlanningComplianceCertificate')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Contratto locazione -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Copia del contratto di locazione</h4>
            <p class="text-muted fs-6 mb-3">(solo nell'ipotesi di immobile locato)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadLeaseAgreement" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('LeaseAgreement')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('LeaseAgreement').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('LeaseAgreement')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Mutuo -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Ricevuta di pagamento ultima rata del mutuo con indicazione del capitale residuo</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadLastMortgagePaymentReceipt" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('LastMortgagePaymentReceipt')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('LastMortgagePaymentReceipt').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('LastMortgagePaymentReceipt')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Detrazioni fiscali -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documentazione inerente la detrazione fiscale ancora in godimento e da trasferire</h4>
            <p class="text-muted fs-6 mb-3">(per lavori eseguiti sull'immobile e/o su parti comuni)</p>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadTaxDeductionDocumentation" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('TaxDeductionDocumentation')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('TaxDeductionDocumentation').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('TaxDeductionDocumentation')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
           <!-- Proposta D'Acquisto -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Proposta D'Acquisto</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadPurchaseOffer" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('PurchaseOffer')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('PurchaseOffer').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('PurchaseOffer')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
           <!-- Allegato Provvigionale -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Allegato Provvigionale</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadCommissionAgreement" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('CommissionAgreement')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('CommissionAgreement').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('CommissionAgreement')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
          <!-- Preliminare Compravendita -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Preliminare Compravendita</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadPreliminarySaleAgreement" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('PreliminarySaleAgreement')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('PreliminarySaleAgreement').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('PreliminarySaleAgreement')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
           <!-- Atto di Vendita -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto di Vendita</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadDeedOfSale" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('DeedOfSale')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('DeedOfSale').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('DeedOfSale')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
           <!-- Atto di Mutuo -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto di Mutuo</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadMortgageDeed" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('MortgageDeed')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('MortgageDeed').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('MortgageDeed')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>
           <!-- Documenti Vari -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documenti Vari</h4>
            
            <!-- Upload Button -->
            <div class="mb-3">
              <button 
                type="button" 
                class="btn btn-sm btn-light-primary" 
                title="Carica documenti" 
                data-document-type="UploadMiscellaneousDocuments" 
                @click="triggerFileInput" 
                :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin me-2' : 'fas fa-upload me-2'"></i>
                Carica documenti
              </button>
            </div>

            <!-- Documents List -->
            <div v-if="hasSpecificDocuments('MiscellaneousDocuments')" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati ({{ getSpecificDocsForType('MiscellaneousDocuments').length }})</label>
              <div class="documents-list">
                <div v-for="doc in getSpecificDocsForType('MiscellaneousDocuments')" :key="doc.Id" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadSpecificDoc(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteSpecificDoc(doc)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted fst-italic">Nessun documento caricato</div>
          </div>

          <!-- Documenti Generici -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Documenti Generici</h4>
            <p class="text-muted fs-6 mb-3">Carica documenti aggiuntivi non presenti nella lista sopra</p>
            
            <!-- Upload Section -->
            <div class="mb-4">
              <label class="form-label fw-semibold mb-2">Carica documenti</label>
              <input 
                class="form-control" 
                type="file" 
                multiple 
                @change="onDocumentChanged" 
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
                ref="documentInputRef">
            </div>

            <!-- Documents List -->
            <div v-if="documents && documents.length > 0" class="documents-list-container">
              <label class="form-label fw-semibold mb-2">Documenti caricati</label>
              <div class="documents-list">
                <div v-for="(doc, index) in documents" :key="index" class="document-item-generic">
                  <div class="document-info-generic">
                    <i class="bi bi-file-earmark-text fs-3 me-2"></i>
                    <span class="document-name-generic">{{ getDocumentName(doc.FileName) }}</span>
                  </div>
                  <div class="document-actions-generic">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-primary me-2" 
                      @click="downloadDocument(doc)"
                      title="Scarica documento">
                      <i class="bi bi-download"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-light-danger" 
                      @click="deleteDocument(doc.Id)"
                      title="Elimina documento">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Hidden file input for specific documents -->
      <input 
        type="file" 
        ref="specificDocumentInputRef" 
        @change="onSpecificDocumentChanged" 
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
        style="display: none;">
      <!-- Footer -->
      <div class="modal-footer">
        <button 
            type="button" 
            class="btn btn-secondary me-auto"
            @click="printWithBrowser">
            <i class="fas fa-print me-2"></i> Stampa
          </button>
        <button type="button" class="btn btn-light me-3" data-bs-dismiss="modal" @click="resetModal">
          Chiudi
        </button>
        <button type="button" class="btn btn-primary">
          Salva Documenti
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import {
  uploadPropertyDocument,
  getPropertyDocuments,
  getDocumentDownloadUrl,
  deletePropertyDocument,
  getDocumentById,
  Documentation,
  SpecificDocumentation,
  uploadSpecificDocument,
  getSpecificDocumentsByRealEstatePropertyId,
  getSpecificDocumentsByRealEstatePropertyIdAndType,
  deleteSpecificDocument
} from "@/core/data/properties";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  props: {
    realEstatePropertyId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useAuthStore();
    const modalElement = ref<HTMLElement | null>(null);
    const documents = ref<Documentation[]>([]);
    const documentInputRef = ref<HTMLInputElement | null>(null);
    const specificDocumentInputRef = ref<HTMLInputElement | null>(null);
    const currentDocumentType = ref<string>('');
    const loading = ref(false);
    
    // Ref per memorizzare tutti i documenti specifici per tipo
    const specificDocuments = ref<{ [key: string]: SpecificDocumentation[] }>({});

    onMounted(async () => {
      modalElement.value = document.getElementById('kt_modal_scheda');
      if (props.realEstatePropertyId) {
        // Rimossa chiamata a loadDocuments() per evitare chiamate duplicate API
        // I documenti vengono già caricati dal componente padre Update.vue
        await loadAllSpecificDocuments();
      }
    });

    const loadAllSpecificDocuments = async () => {
      if (!props.realEstatePropertyId) return;
      
      try {
        const allDocs = await getSpecificDocumentsByRealEstatePropertyId(props.realEstatePropertyId);
        
        // Organizza i documenti per tipo
        const docsByType: { [key: string]: SpecificDocumentation[] } = {};
        allDocs.forEach(doc => {
          if (!docsByType[doc.DocumentType]) {
            docsByType[doc.DocumentType] = [];
          }
          docsByType[doc.DocumentType].push(doc);
        });
        
        specificDocuments.value = docsByType;
      } catch (error) {
        console.error('Errore nel caricamento dei documenti specifici:', error);
      }
    };





    const loadDocuments = async () => {
      if (props.realEstatePropertyId) {
        documents.value = await getPropertyDocuments(props.realEstatePropertyId);
      }
    };

    const onDocumentChanged = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0 && props.realEstatePropertyId) {
        loading.value = true;
        
        try {
          const uploadPromises = Array.from(target.files).map(file => 
            uploadPropertyDocument(file, props.realEstatePropertyId)
          );
          
          await Promise.all(uploadPromises);
          
          const error = store.errors;
          if (!error) {
            Swal.fire({
              text: "Documenti caricati con successo!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(async function () {
              await loadDocuments();
              if (documentInputRef.value) {
                documentInputRef.value.value = '';
              }
            });
          } else {
            Swal.fire({
              text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, capito!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
        } catch (error) {
          Swal.fire({
            text: "Attenzione, si è verificato un errore.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } finally {
          loading.value = false;
        }
      }
    };

    const downloadDocument = async (doc: Documentation) => {
      try {
        const urlWithSas = await getDocumentDownloadUrl(doc.FileName);
        if (urlWithSas) {
          window.open(urlWithSas, '_blank');
        }
      } catch (error) {
        Swal.fire({
          text: "Errore durante il download del documento.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    const deleteDocument = async (documentId: number) => {
      Swal.fire({
        text: "Confermare l'eliminazione del documento?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary"
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          loading.value = true;
          await deletePropertyDocument(documentId);
          await loadDocuments();
          loading.value = false;
          
          Swal.fire({
            text: "Documento eliminato con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      });
    };

    const getDocumentName = (fileName: string) => {
      const parts = fileName.split('/');
      return parts[parts.length - 1];
    };

    // Helper function to convert data-document-type to DocumentType
    const getDocumentTypeFromDataAttribute = (dataType: string): string => {
      // Remove "Upload" prefix if present
      return dataType.startsWith('Upload') ? dataType.substring(6) : dataType;
    };

    const triggerFileInput = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      const documentType = button.getAttribute('data-document-type');
      if (documentType && specificDocumentInputRef.value) {
        // Convert data-document-type to DocumentType format
        currentDocumentType.value = getDocumentTypeFromDataAttribute(documentType);
        // Abilita selezione multipla
        specificDocumentInputRef.value.setAttribute('multiple', 'multiple');
        specificDocumentInputRef.value.click();
      }
    };
    
    // Helper functions for specific documents
    const getSpecificDocsForType = (documentType: string): SpecificDocumentation[] => {
      return specificDocuments.value[documentType] || [];
    };

    const hasSpecificDocuments = (documentType: string): boolean => {
      return getSpecificDocsForType(documentType).length > 0;
    };

    const onSpecificDocumentChanged = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0 && currentDocumentType.value) {
        loading.value = true;
        
        try {
          // Validazione dimensione file (max 50MB per file)
          const maxSize = 50 * 1024 * 1024; // 50MB
          const filesToUpload = Array.from(target.files);
          
          for (const file of filesToUpload) {
            if (file.size > maxSize) {
              Swal.fire({
                text: `Il file "${file.name}" è troppo grande. Dimensione massima consentita: 50MB`,
                icon: "warning",
                buttonsStyling: false,
                confirmButtonText: "Ok",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
              continue;
            }
            
            // Mostra notifica di caricamento per ogni file
            Swal.fire({
              title: 'Caricamento in corso...',
              text: `Caricamento di ${file.name}`,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });
            
            // Carica il file usando la nuova API
            await uploadSpecificDocument(file, props.realEstatePropertyId, currentDocumentType.value);
          }
          
          Swal.close();
          
          // Ricarica tutti i documenti specifici
          await loadAllSpecificDocuments();

          const error = store.errors;
          if (!error) {
            Swal.fire({
              text: filesToUpload.length > 1 
                ? `${filesToUpload.length} documenti caricati con successo!` 
                : "Documento caricato con successo!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              heightAuto: false,
              timer: 2000,
              timerProgressBar: true,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            });
          } else {
            Swal.fire({
              text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, capito!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
        } catch (error: any) {
          Swal.close();
          
          let errorMessage = "Attenzione, si è verificato un errore durante il caricamento del documento.";
          if (error?.response?.data?.Message) {
            errorMessage = error.response.data.Message;
          } else if (error?.message) {
            errorMessage = error.message;
          }
          
          Swal.fire({
            text: errorMessage,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } finally {
          loading.value = false;
          if (target) {
            target.value = '';
          }
          currentDocumentType.value = '';
        }
      }
    };

    const downloadSpecificDoc = async (doc: SpecificDocumentation) => {
      try {
        const urlWithSas = await getDocumentDownloadUrl(doc.FileName);
        if (urlWithSas) {
          window.open(urlWithSas, '_blank');
        }
      } catch (error) {
        Swal.fire({
          text: "Errore durante il download del documento.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    const deleteSpecificDoc = async (doc: SpecificDocumentation) => {
      Swal.fire({
        text: "Confermare l'eliminazione del documento?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary"
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          loading.value = true;
          await deleteSpecificDocument(doc.Id);
          await loadAllSpecificDocuments();
          loading.value = false;
          
          Swal.fire({
            text: "Documento eliminato con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      });
    };

    const resetModal = () => {
      // I radio button sono stati rimossi, questa funzione non è più necessaria
      // ma la manteniamo per compatibilità
    };

    const printWithBrowser = () => {
      const modalContent = document.getElementById("kt_modal_scheda");
      if (!modalContent) return;

      const printContent = modalContent.cloneNode(true) as HTMLElement;
      
      // I radio button sono stati rimossi e sostituiti con badge
      // Non è più necessario gestirli nella stampa

      const footer = printContent.querySelector('.modal-footer');
      if (footer) footer.remove();

      const printHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Documentazione Immobile</title>
            <meta charset="UTF-8">
            <style>
              @page {
                size: A4;
                margin: 10mm;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 15mm;
                color: #000;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .document-item {
                margin-bottom: 8mm;
                page-break-inside: avoid;
              }
              h2 {
                text-align: center;
                margin-bottom: 10mm;
              }
              .form-check-label {
                margin-left: 5px;
              }
              .text-muted {
                color: #666 !important;
              }
              img {
                max-width: 100px;
                height: auto;
              }
              input[type="checkbox"] {
                -webkit-appearance: checkbox !important;
                -moz-appearance: checkbox !important;
                appearance: checkbox !important;
                width: 14px !important;
                height: 14px !important;
                border: 1px solid #000 !important;
                margin: 0 5px 0 0 !important;
                vertical-align: middle;
              }
              input[type="checkbox"]:checked {
                background-color: #000 !important;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E") !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Per favore abilita i popup per la stampa");
        return;
      }

      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    };

    return {
      modalElement,
      documents,
      documentInputRef,
      specificDocumentInputRef,
      loading,
      specificDocuments,
      onDocumentChanged,
      downloadDocument,
      deleteDocument,
      getDocumentName,
      resetModal,
      printWithBrowser,
      triggerFileInput,
      onSpecificDocumentChanged,
      getSpecificDocsForType,
      hasSpecificDocuments,
      downloadSpecificDoc,
      deleteSpecificDoc
    };
  }
});
</script>

<style scoped>
.documents-list-container {
  margin-top: 15px;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.document-item-generic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--bs-gray-300);
  border-radius: 6px;
  background-color: var(--bs-body-bg);
  transition: all 0.3s ease;
}

.document-item-generic:hover {
  border-color: var(--bs-primary);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.document-info-generic {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.document-name-generic {
  font-weight: 500;
  color: var(--bs-gray-800);
  word-break: break-word;
  font-size: 0.9rem;
}

.document-actions-generic {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.document-actions-generic .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

[data-bs-theme="dark"] .document-item-generic {
  border-color: var(--bs-gray-600);
}

[data-bs-theme="dark"] .document-name-generic {
  color: var(--bs-gray-200);
}

/* Badge styles for document status */
.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-light {
  background-color: #e9ecef;
  color: #495057;
}

[data-bs-theme="dark"] .badge-light {
  background-color: var(--bs-gray-700);
  color: var(--bs-gray-300);
}

.gap-2 {
  gap: 0.5rem;
}

[data-bs-theme="dark"] .document-item-generic:hover {
  border-color: var(--bs-primary);
}

@media print {
  body.modal-open {
    visibility: hidden;
  }
  body.modal-open .modal {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .modal-footer {
    display: none !important;
  }
  
  .documents-list-container,
  .document-item-generic {
    page-break-inside: avoid;
  }
  
  /* Stile per i checkbox nella stampa */
  input[type="checkbox"] {
    appearance: checkbox !important;
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    width: 13px !important;
    height: 13px !important;
    border: 1px solid #000 !important;
  }
  input[type="checkbox"]:checked {
    background-color: #000 !important;
  }
  input[type="checkbox"]:checked::before {
    content: "✓";
    color: white;
    font-size: 10px;
    position: relative;
    left: 2px;
    top: -2px;
  }
}
</style>