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
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('IdentificationDocumentDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('IdentificationDocumentDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('IdentificationDocumentDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('IdentificationDocumentDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('IdentificationDocumentDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('IdentificationDocumentDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('IdentificationDocumentDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadIdentificationDocument" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Codice Fiscale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Codice Fiscale o Tessera Sanitaria</h4>
            <p class="text-muted fs-6 mb-3">(se persona giuridica del legale rappresentante o del titolare)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('TaxCodeOrHealthCardDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('TaxCodeOrHealthCardDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('TaxCodeOrHealthCardDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('TaxCodeOrHealthCardDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('TaxCodeOrHealthCardDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('TaxCodeOrHealthCardDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('TaxCodeOrHealthCardDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadTaxCodeOrHealthCard" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Estratto atto matrimonio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Estratto per riassunto dell'atto di matrimonio</h4>
            <p class="text-muted fs-6 mb-3">(con indicato il regime coniugale e patrimoniale o Certificato di stato libero o Certificato di unione civile)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('MarriageCertificateSummaryDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('MarriageCertificateSummaryDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('MarriageCertificateSummaryDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('MarriageCertificateSummaryDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('MarriageCertificateSummaryDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('MarriageCertificateSummaryDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('MarriageCertificateSummaryDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadMarriageCertificateSummary" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Atto di provenienza -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto/i di provenienza</h4>
            <p class="text-muted fs-6 mb-3">(Acquisto, Successione + Accettazione eredità, Divisione, Donazione, Permuta, Decreto di Trasferimento, Sentenza, Usucapione, etc.)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('DeedOfOriginDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('DeedOfOriginDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('DeedOfOriginDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('DeedOfOriginDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('DeedOfOriginDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('DeedOfOriginDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('DeedOfOriginDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadDeedOfOrigin" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Impianti -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Impianti: dichiarazione di conformità o di rispondenza</h4>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elettrico/elettronico</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('ElectricalElectronicSystemDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('ElectricalElectronicSystemDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('ElectricalElectronicSystemDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('ElectricalElectronicSystemDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('ElectricalElectronicSystemDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('ElectricalElectronicSystemDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('ElectricalElectronicSystemDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadElectricalElectronicSystem" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- idrico/sanitario</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('PlumbingSanitarySystemDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('PlumbingSanitarySystemDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('PlumbingSanitarySystemDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('PlumbingSanitarySystemDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('PlumbingSanitarySystemDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('PlumbingSanitarySystemDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('PlumbingSanitarySystemDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadPlumbingSanitarySystem" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- gas</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('GasSystemDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('GasSystemDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('GasSystemDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('GasSystemDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('GasSystemDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('GasSystemDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('GasSystemDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadGasSystem" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- riscaldamento/condizionamento</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('HeatingAirConditioningSystemDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('HeatingAirConditioningSystemDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('HeatingAirConditioningSystemDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('HeatingAirConditioningSystemDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('HeatingAirConditioningSystemDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('HeatingAirConditioningSystemDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('HeatingAirConditioningSystemDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadHeatingAirConditioningSystem" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- sollevamento</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('LiftingSystemDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('LiftingSystemDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('LiftingSystemDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('LiftingSystemDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('LiftingSystemDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('LiftingSystemDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('LiftingSystemDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadLiftingSystem" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- antincendio</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('FireSafetySystemDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('FireSafetySystemDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('FireSafetySystemDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('FireSafetySystemDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('FireSafetySystemDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('FireSafetySystemDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('FireSafetySystemDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadFireSafetySystem" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>
          </div>
          <!-- Libretto caldaia -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Libretto della caldaia</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('BoilerMaintenanceLogDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('BoilerMaintenanceLogDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('BoilerMaintenanceLogDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('BoilerMaintenanceLogDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('BoilerMaintenanceLogDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('BoilerMaintenanceLogDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('BoilerMaintenanceLogDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadBoilerMaintenanceLog" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Abitabilità/Agibilità -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Abitabilità / Agibilità</h4>
            <p class="text-muted fs-6 mb-3">(Certificato rilasciato dal Comune o Attestazione redatta dal Tecnico)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('HabitabilityCertificateDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('HabitabilityCertificateDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('HabitabilityCertificateDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('HabitabilityCertificateDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('HabitabilityCertificateDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('HabitabilityCertificateDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('HabitabilityCertificateDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadHabitabilityCertificate" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Certificato idoneità statica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di idoneità statica</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('StructuralIntegrityCertificateDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('StructuralIntegrityCertificateDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('StructuralIntegrityCertificateDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('StructuralIntegrityCertificateDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('StructuralIntegrityCertificateDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('StructuralIntegrityCertificateDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('StructuralIntegrityCertificateDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadStructuralIntegrityCertificate" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Relazione Tecnica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Relazione Tecnica Integrata di Conformità Edilizia e Catastale</h4>
            <p class="text-muted fs-6 mb-3">(comprenderà dati catastali completi, descrizione, titolarità, situazione edilizia con riepilogo dei titoli abilitanti, informazioni sull'agibilità/abitabilità, conformità edilizia e catastale, informazioni circa l'esistenza di un interesse culturale del bene ai sensi del D. Lgs. 42/04 ed attestazione conclusiva. Saranno allegati visura catastale e planimetria catastale)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('BuildingCadastralComplianceReportDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('BuildingCadastralComplianceReportDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('BuildingCadastralComplianceReportDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('BuildingCadastralComplianceReportDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('BuildingCadastralComplianceReportDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('BuildingCadastralComplianceReportDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('BuildingCadastralComplianceReportDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadBuildingCadastralComplianceReport" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Catasto -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Catasto:</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- visura e planimetria</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('LandRegistryDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('LandRegistryDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('LandRegistryDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('LandRegistryDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('LandRegistryDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('LandRegistryDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('LandRegistryDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadLandRegistry" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- estratto di mappa</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('CadastralMapExtractDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('CadastralMapExtractDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('CadastralMapExtractDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('CadastralMapExtractDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('CadastralMapExtractDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('CadastralMapExtractDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('CadastralMapExtractDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadCadastralMapExtract" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elaborato planimetrico con elenco subalterni</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('FloorPlanWithSubsidiaryUnitsDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('FloorPlanWithSubsidiaryUnitsDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('FloorPlanWithSubsidiaryUnitsDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('FloorPlanWithSubsidiaryUnitsDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('FloorPlanWithSubsidiaryUnitsDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('FloorPlanWithSubsidiaryUnitsDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('FloorPlanWithSubsidiaryUnitsDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadFloorPlanWithSubsidiaryUnits" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>
          </div>
          <!-- APE -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Attestato di Certificazione/Prestazione Energetica (laddove previsto per legge)</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('EnergyPerformanceCertificateDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('EnergyPerformanceCertificateDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('EnergyPerformanceCertificateDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('EnergyPerformanceCertificateDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('EnergyPerformanceCertificateDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('EnergyPerformanceCertificateDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('EnergyPerformanceCertificateDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadEnergyPerformanceCertificate" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Visura ipocatastale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura ipocatastale</h4>
            <p class="text-muted fs-6 mb-3">(a verifica della titolarità immobiliare ed eventuali gravami)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('MortgageLienRegistrySearchDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('MortgageLienRegistrySearchDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('MortgageLienRegistrySearchDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('MortgageLienRegistrySearchDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('MortgageLienRegistrySearchDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('MortgageLienRegistrySearchDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('MortgageLienRegistrySearchDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadMortgageLienRegistrySearch" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Condominio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Condominio (indicare recapiti dell'amministratore):</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- regolamento</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('CondominiumBylawsDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('CondominiumBylawsDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('CondominiumBylawsDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('CondominiumBylawsDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('CondominiumBylawsDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('CondominiumBylawsDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('CondominiumBylawsDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadCondominiumBylaws" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- tabelle millesimali</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('MillesimalTablesDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('MillesimalTablesDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('MillesimalTablesDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('MillesimalTablesDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('MillesimalTablesDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('MillesimalTablesDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('MillesimalTablesDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadMillesimalTables" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimo bilancio consuntivo e preventivo</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('LatestFinancialStatementAndBudgetDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('LatestFinancialStatementAndBudgetDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('LatestFinancialStatementAndBudgetDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('LatestFinancialStatementAndBudgetDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('LatestFinancialStatementAndBudgetDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('LatestFinancialStatementAndBudgetDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('LatestFinancialStatementAndBudgetDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadLatestFinancialStatementAndBudget" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimi due verbali dell'assemblea condominiale</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('LastTwoCondominiumMeetingMinutesDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('LastTwoCondominiumMeetingMinutesDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('LastTwoCondominiumMeetingMinutesDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('LastTwoCondominiumMeetingMinutesDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('LastTwoCondominiumMeetingMinutesDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('LastTwoCondominiumMeetingMinutesDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('LastTwoCondominiumMeetingMinutesDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadLastTwoCondominiumMeetingMinutes" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- dichiarazione scritta e firmata dall'amministratore attestante l'avvenuto pagamento di tutte le spese condominiali e indicazione delle eventuali spese straordinarie deliberate e delle liti in corso</h5>
              <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('SignedStatementFromAdministratorDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('SignedStatementFromAdministratorDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('SignedStatementFromAdministratorDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('SignedStatementFromAdministratorDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('SignedStatementFromAdministratorDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('SignedStatementFromAdministratorDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('SignedStatementFromAdministratorDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadSignedStatementFromAdministrator" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
            </div>
          </div>
          <!-- Visura camerale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura camerale</h4>
            <p class="text-muted fs-6 mb-3">(solo se persona giuridica)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('ChamberOfCommerceBusinessRegistrySearchDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('ChamberOfCommerceBusinessRegistrySearchDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('ChamberOfCommerceBusinessRegistrySearchDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('ChamberOfCommerceBusinessRegistrySearchDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('ChamberOfCommerceBusinessRegistrySearchDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('ChamberOfCommerceBusinessRegistrySearchDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('ChamberOfCommerceBusinessRegistrySearchDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadChamberOfCommerceBusinessRegistrySearch" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Procura -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Procura speciale o generale</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di procuratore)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('PowerOfAttorneyDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('PowerOfAttorneyDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('PowerOfAttorneyDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('PowerOfAttorneyDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('PowerOfAttorneyDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('PowerOfAttorneyDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('PowerOfAttorneyDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadPowerOfAttorney" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Certificato Urbanistico -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di Destinazione Urbanistica</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di terreni)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('UrbanPlanningComplianceCertificateDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('UrbanPlanningComplianceCertificateDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('UrbanPlanningComplianceCertificateDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('UrbanPlanningComplianceCertificateDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('UrbanPlanningComplianceCertificateDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('UrbanPlanningComplianceCertificateDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('UrbanPlanningComplianceCertificateDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadUrbanPlanningComplianceCertificate" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Contratto locazione -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Copia del contratto di locazione</h4>
            <p class="text-muted fs-6 mb-3">(solo nell'ipotesi di immobile locato)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('LeaseAgreementDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('LeaseAgreementDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('LeaseAgreementDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('LeaseAgreementDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('LeaseAgreementDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('LeaseAgreementDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('LeaseAgreementDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadLeaseAgreement" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Mutuo -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Ricevuta di pagamento ultima rata del mutuo con indicazione del capitale residuo</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('LastMortgagePaymentReceiptDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('LastMortgagePaymentReceiptDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('LastMortgagePaymentReceiptDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('LastMortgagePaymentReceiptDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('LastMortgagePaymentReceiptDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('LastMortgagePaymentReceiptDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('LastMortgagePaymentReceiptDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadLastMortgagePaymentReceipt" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Detrazioni fiscali -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documentazione inerente la detrazione fiscale ancora in godimento e da trasferire</h4>
            <p class="text-muted fs-6 mb-3">(per lavori eseguiti sull'immobile e/o su parti comuni)</p>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('TaxDeductionDocumentationDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('TaxDeductionDocumentationDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('TaxDeductionDocumentationDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('TaxDeductionDocumentationDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('TaxDeductionDocumentationDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('TaxDeductionDocumentationDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('TaxDeductionDocumentationDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadTaxDeductionDocumentation" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
           <!-- Proposta D'Acquisto -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Proposta D'Acquisto</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('PurchaseOfferDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('PurchaseOfferDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('PurchaseOfferDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('PurchaseOfferDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('PurchaseOfferDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('PurchaseOfferDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('PurchaseOfferDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadPurchaseOffer" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
           <!-- Allegato Provvigionale -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Allegato Provvigionale</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('CommissionAgreementDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('CommissionAgreementDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('CommissionAgreementDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('CommissionAgreementDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('CommissionAgreementDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('CommissionAgreementDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('CommissionAgreementDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadCommissionAgreement" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
          <!-- Preliminare Compravendita -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Preliminare Compravendita</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('PreliminarySaleAgreementDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('PreliminarySaleAgreementDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('PreliminarySaleAgreementDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('PreliminarySaleAgreementDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('PreliminarySaleAgreementDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('PreliminarySaleAgreementDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('PreliminarySaleAgreementDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadPreliminarySaleAgreement" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
           <!-- Atto di Vendita -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto di Vendita</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('DeedOfSaleDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('DeedOfSaleDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('DeedOfSaleDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('DeedOfSaleDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('DeedOfSaleDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('DeedOfSaleDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('DeedOfSaleDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadDeedOfSale" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
           <!-- Atto di Mutuo -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto di Mutuo</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('MortgageDeedDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('MortgageDeedDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('MortgageDeedDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('MortgageDeedDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('MortgageDeedDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('MortgageDeedDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('MortgageDeedDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadMortgageDeed" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
          </div>
           <!-- Documenti Vari -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documenti Vari</h4>
            <div class="d-flex align-items-center gap-2">
                <span v-if="hasDocument('MiscellaneousDocumentsDocumentId')" class="badge badge-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-1"></i> Caricato
                </span>
                <span v-else class="badge badge-light d-flex align-items-center">
                    <i class="fas fa-times-circle me-1"></i> Non caricato
                </span>
                <button 
                  type="button" 
                  class="btn btn-icon btn-sm pdf-view-btn" 
                  :class="hasDocument('MiscellaneousDocumentsDocumentId') ? 'btn-success' : 'btn-light'"
                  title="Visualizza documento" 
                  :disabled="!hasDocument('MiscellaneousDocumentsDocumentId')"
                  @click="() => downloadSpecificDocument(getDocumentId('MiscellaneousDocumentsDocumentId'))">
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button 
                  v-if="hasDocument('MiscellaneousDocumentsDocumentId')"
                  type="button" 
                  class="btn btn-icon btn-sm btn-danger me-2" 
                  title="Elimina documento" 
                  @click="() => deleteSpecificDocument('MiscellaneousDocumentsDocumentId')"
                  :disabled="loading">
                <i class="fas fa-trash fs-4"></i>
                </button>
                <button v-if="!hasDocument('MiscellaneousDocumentsDocumentId')" type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento" data-document-type="UploadMiscellaneousDocuments" @click="triggerFileInput" :disabled="loading">
                <i :class="loading ? 'fas fa-spinner fa-spin fs-4' : 'fas fa-upload fs-4'"></i>
                </button>
          </div>
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
  Documentation
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
    const documentsTabId = ref<number | null>(null);
    const documentsTab = ref<any>(null);
    const loading = ref(false);

    onMounted(async () => {
      modalElement.value = document.getElementById('kt_modal_scheda');
      if (props.realEstatePropertyId) {
        // Rimossa chiamata a loadDocuments() per evitare chiamate duplicate API
        // I documenti vengono già caricati dal componente padre Update.vue
        await loadOrCreateDocumentsTab();
      }
    });

    const loadOrCreateDocumentsTab = async () => {
      try {
        const response = await ApiService.get(
          `DocumentsTabs/GetOrCreateByRealEstatePropertyId?realEstatePropertyId=${props.realEstatePropertyId}`,
          ""
        );
        if (response.data) {
          documentsTabId.value = response.data.Id;
          documentsTab.value = response.data;
        }
      } catch (error) {
        console.error('Errore nel caricamento di DocumentsTab:', error);
        // Fallback: prova a usare realEstatePropertyId come documentsTabId
        documentsTabId.value = props.realEstatePropertyId;
      }
    };

    const downloadSpecificDocument = async (documentId: number | null | undefined) => {
      if (!documentId) {
        Swal.fire({
          text: "Nessun documento disponibile per il download.",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      try {
        const document = await getDocumentById(documentId);
        if (document && document.FileName) {
          // I documenti specifici sono nel container privato, quindi usiamo SAS token
          const urlWithSas = await getDocumentDownloadUrl(document.FileName);
          if (urlWithSas) {
            window.open(urlWithSas, '_blank');
          } else {
            throw new Error('Impossibile generare il link di download');
          }
        } else {
          throw new Error('Documento non trovato');
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

    const hasDocument = (documentIdField: string): boolean => {
      if (!documentsTab.value) return false;
      const documentId = documentsTab.value[documentIdField];
      return documentId != null && documentId !== undefined;
    };

    const getDocumentId = (documentIdField: string): number | null | undefined => {
      if (!documentsTab.value) return null;
      return documentsTab.value[documentIdField];
    };

    // Mappa i tipi di documento ai loro endpoint di eliminazione
    const getDeleteEndpoint = (documentIdField: string): string | null => {
      const endpointMap: { [key: string]: string } = {
        'IdentificationDocumentDocumentId': 'DeleteIdentificationDocumentDocument',
        'TaxCodeOrHealthCardDocumentId': 'DeleteTaxCodeOrHealthCard',
        'MarriageCertificateSummaryDocumentId': 'DeleteMarriageCertificateSummary',
        'DeedOfOriginDocumentId': 'DeleteDeedOfOrigin',
        'ElectricalElectronicSystemDocumentId': 'DeleteElectricalElectronicSystem',
        'PlumbingSanitarySystemDocumentId': 'DeletePlumbingSanitarySystem',
        'GasSystemDocumentId': 'DeleteGasSystem',
        'HeatingAirConditioningSystemDocumentId': 'DeleteHeatingAirConditioningSystem',
        'LiftingSystemDocumentId': 'DeleteLiftingSystem',
        'FireSafetySystemDocumentId': 'DeleteFireSafetySystem',
        'BoilerMaintenanceLogDocumentId': 'DeleteBoilerMaintenanceLog',
        'HabitabilityCertificateDocumentId': 'DeleteHabitabilityCertificate',
        'StructuralIntegrityCertificateDocumentId': 'DeleteStructuralIntegrityCertificate',
        'BuildingCadastralComplianceReportDocumentId': 'DeleteBuildingCadastralComplianceReport',
        'LandRegistryDocumentId': 'DeleteLandRegistry',
        'CadastralMapExtractDocumentId': 'DeleteCadastralMapExtract',
        'FloorPlanWithSubsidiaryUnitsDocumentId': 'DeleteFloorPlanWithSubsidiaryUnits',
        'EnergyPerformanceCertificateDocumentId': 'DeleteEnergyPerformanceCertificate',
        'MortgageLienRegistrySearchDocumentId': 'DeleteMortgageLienRegistrySearch',
        'CondominiumBylawsDocumentId': 'DeleteCondominiumBylaws',
        'MillesimalTablesDocumentId': 'DeleteMillesimalTables',
        'LatestFinancialStatementAndBudgetDocumentId': 'DeleteLatestFinancialStatementAndBudget',
        'LastTwoCondominiumMeetingMinutesDocumentId': 'DeleteLastTwoCondominiumMeetingMinutes',
        'SignedStatementFromAdministratorDocumentId': 'DeleteSignedStatementFromAdministrator',
        'ChamberOfCommerceBusinessRegistrySearchDocumentId': 'DeleteChamberOfCommerceBusinessRegistrySearch',
        'PowerOfAttorneyDocumentId': 'DeletePowerOfAttorney',
        'UrbanPlanningComplianceCertificateDocumentId': 'DeleteUrbanPlanningComplianceCertificate',
        'LeaseAgreementDocumentId': 'DeleteLeaseAgreement',
        'LastMortgagePaymentReceiptDocumentId': 'DeleteLastMortgagePaymentReceipt',
        'TaxDeductionDocumentationDocumentId': 'DeleteTaxDeductionDocumentation',
        'PurchaseOfferDocumentId': 'DeletePurchaseOffer',
        'CommissionAgreementDocumentId': 'DeleteCommissionAgreement',
        'PreliminarySaleAgreementDocumentId': 'DeletePreliminarySaleAgreement',
        'DeedOfSaleDocumentId': 'DeleteDeedOfSale',
        'MortgageDeedDocumentId': 'DeleteMortgageDeed',
        'MiscellaneousDocumentsDocumentId': 'DeleteMiscellaneousDocuments'
      };
      return endpointMap[documentIdField] || null;
    };

    const deleteSpecificDocument = async (documentIdField: string) => {
      if (!documentsTabId.value) {
        Swal.fire({
          text: "Errore: impossibile identificare il documento da eliminare.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      const deleteEndpoint = getDeleteEndpoint(documentIdField);
      if (!deleteEndpoint) {
        Swal.fire({
          text: "Errore: endpoint di eliminazione non trovato per questo tipo di documento.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      const result = await Swal.fire({
        text: "Sei sicuro di voler eliminare questo documento?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary"
        },
      });

      if (result.isConfirmed) {
        loading.value = true;
        try {
          await ApiService.delete(`DocumentsTabs/${deleteEndpoint}?id=${documentsTabId.value}`);
          
          // Ricarica DocumentsTab per aggiornare lo stato
          await loadOrCreateDocumentsTab();
          
          Swal.fire({
            text: "Documento eliminato con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } catch (error: any) {
          Swal.fire({
            text: error?.response?.data?.Message || "Errore durante l'eliminazione del documento.",
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

    const triggerFileInput = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      const documentType = button.getAttribute('data-document-type');
      if (documentType && specificDocumentInputRef.value) {
        currentDocumentType.value = documentType;
        specificDocumentInputRef.value.click();
      }
    };

    const onSpecificDocumentChanged = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0 && currentDocumentType.value) {
        const file = target.files[0];
        
        // Validazione dimensione file (max 50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          Swal.fire({
            text: "Il file è troppo grande. Dimensione massima consentita: 50MB",
            icon: "warning",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          target.value = '';
          currentDocumentType.value = '';
          return;
        }

        loading.value = true;
        
        // Mostra notifica di caricamento
        const loadingToast = Swal.fire({
          title: 'Caricamento in corso...',
          text: `Caricamento di ${file.name}`,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        try {
          // Prima recupera o crea DocumentsTab
          if (!documentsTabId.value) {
            await loadOrCreateDocumentsTab();
          }

          if (!documentsTabId.value) {
            throw new Error('Impossibile recuperare DocumentsTab per questa proprietà');
          }

          const formData = new FormData();
          formData.append('File', file);
          formData.append('FolderName', `${props.realEstatePropertyId}`);

          await ApiService.post(
            `DocumentsTabs/${currentDocumentType.value}?documentsTabId=${documentsTabId.value}`,
            formData
          );

          Swal.close();
          
          // Ricarica DocumentsTab per aggiornare i bottoni di download
          await loadOrCreateDocumentsTab();

          const error = store.errors;
          if (!error) {
            Swal.fire({
              text: "Documento caricato con successo!",
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
      documentsTab,
      onDocumentChanged,
      downloadDocument,
      deleteDocument,
      getDocumentName,
      resetModal,
      printWithBrowser,
      triggerFileInput,
      onSpecificDocumentChanged,
      downloadSpecificDocument,
      hasDocument,
      getDocumentId,
      deleteSpecificDocument
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