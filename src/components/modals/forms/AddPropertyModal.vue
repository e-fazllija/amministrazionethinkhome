<template>
  <div
    class="modal fade"
    id="kt_modal_add_property"
    ref="addPropertyModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_property_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Aggiungi Immobili</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_property_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
           ref="formRef" >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_property_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_property_header"
              data-kt-scroll-wrappers="#kt_modal_add_property_scroll"
              data-kt-scroll-offset="300px">

                <!--begin::Billing toggle-->
                  <div
                   class="fw-bold fs-3 rotate collapsible mb-7"
                   data-bs-toggle="collapse"
                   href="#kt_modal_add_property_billing_info"
                   role="button"
                   aria-expanded="false"
                   aria-controls="kt_property_view_details">
                   Tipologia
                   <span class="ms-2 rotate-180"><KTIcon icon-name="down" icon-class="fs-3" /></span>
                  </div>
                <!--end::Billing toggle-->
                <!--begin::Billing form-->
                <div id="kt_modal_add_property_billing_info" class="collapse show">

                 <!--begin::Input group-->
                  <div class="d-flex flex-column mb-7 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                      <span class="required">Categoria</span>
                        <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Seleziona una categoria di immobile"></i>
                     </label>
                   <!--end::Label-->
                   <!--begin::Input-->
                     <select class="form-control" v-model="formData.category">
                     <option value="">Seleziona una Categoria...</option>
                     <option value="Residenziale">Residenziale</option>
                     <option value="Capannone">Capannone</option>
                     <option value="Negozi-Locale Commerciale">Negozi/Locale Commerciale</option>
                     <option value="Magazzino">Magazzino</option>
                     <option value="Garage">Garage</option>
                     <option value="Ufficio">Ufficio</option>
                     <option value="Terreno">Terreno</option>
                    </select>
                   <!--end::Input-->
                  </div>
                <!--end::Input group-->

                <!--begin::Input group Tipologia-->
                <div v-if="showTipologia" class="d-flex flex-column mb-7 fv-row">
                   <label class="fs-6 fw-semobold mb-2">
                   <span class="required">Tipologia</span>
                   <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Seleziona una tipologia di immobile"></i>
                   </label>
                  <select class="form-control" v-model="formData.typology">
                    <option v-for="tipologia in typesavailable" :key="tipologia" :value="tipologia">
                    {{ tipologia }}
                    </option>
                  </select>
                </div>
                <!--end::Input group Tipologia-->

                <!--begin::Input group-->
                <div  class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Stato vendita o affitto</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Seleziona lo Stato dell'immobile"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control" v-model="formData.status">
                  <option value="">Scegli tra vendita e affitto</option>
                  <option value="Vendita">Vendita</option>
                  <option value="Affitto">Affitto</option>
                </select>
                <!--end::Input-->
                </div>
                <!--end::Input group-->
                </div>
            
            
              <!--begin::Billing toggle-->
              <div
                class="fw-bold fs-3 rotate collapsible mb-7"
                data-bs-toggle="collapse"
                href="#kt_modal_add_property_billing_info2"
                role="button"
                aria-expanded="false"
                aria-controls="kt_property_view_details">
                Localita
                <span class="ms-2 rotate-180"><KTIcon icon-name="down" icon-class="fs-3" /></span>
              </div>
              <!--end::Billing toggle-->
              <!--begin::Billing form-->
              <div id="kt_modal_add_property_billing_info2" class="collapse show">
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Indirizzo</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="addressLine">
                    <el-input v-model="formData.addressLine" type="text"/>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Comune</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="town">
                    <el-input v-model="formData.town" type="text"/>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2">Provincia</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="state">
                      <el-input v-model="formData.state" type="text"/>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Codice Postale</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="postCode">
                      <el-input v-model="formData.postCode" type="number"/>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Input group-->
              </div>

            </div>
                 <div
                  class="fw-bold fs-3 rotate collapsible mb-7"
                  data-bs-toggle="collapse"
                  href="#kt_modal_add_property_billing_info3"
                  role="button"
                  aria-expanded="false"
                  aria-controls="kt_property_view_details">Caratteristiche
                   <span class="ms-2 rotate-180">
                   <KTIcon icon-name="down" icon-class="fs-3" />
                   </span>
                 </div>
                 <!--end::Billing toggle-->
           <div id="kt_modal_add_property_billing_info3" class="collapse show">
                   <!--begin::Input group-->
                  <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="d-flex flex-column mb-7 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Superficie commerciale (m²)</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="commercialsurfaceate">
                      <el-input v-model="formData.commercialSurfaceate" type="number" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                  </div>

                      <!--begin::Col-->
                      <div class="col-md-6 fv-row">
                         <!--begin::Label-->
                         <label class="required fs-6 fw-semobold mb-2"
                         >Piano </label>
                         <!--end::Label-->
                         <!--begin::Input-->
                         <select class="form-control"  v-model="formData.floor">
                         <option value="">Scegli</option>
                         <option value="Interrato -2">Interrato -2</option>
                         <option value="Interrato -1">Interrato -1</option>
                         <option value="Seminterrato">Seminterrato</option>
                         <option value="Piano Terra">Piano Terra</option>
                         <option value="Piano Rialzato">Piano Rialzato</option>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                         <option value="6">6</option>
                         <option value="7">7</option>
                         <option value="8">8</option>
                         <option value="9">9</option>
                         <option value="10">10</option>
                         </select>
                        <!--end::Input-->
                      </div>
                      <!--end::Col-->

                      <!--begin::Col-->
                      <div class="col-md-6 fv-row">
                      <!--begin::Label-->
                      <label class="required fs-6 fw-semobold mb-2"
                      >Totale piani edificio</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <el-form-item prop="totalbuildingfloors">
                      <el-input v-model="formData.totalBuildingFloors" type="number" />
                      </el-form-item>
                      <!--end::Input-->
                      </div>
                      <!--end::Col-->

                    <!--begin::Col-->
                    <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Ascensori</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select class="form-control" v-model="formData.elevators">
                         <option value="">Numero Ascensori</option>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                         <option value="6">6</option>
                         <option value="7">7</option>
                         <option value="8">8</option>
                         <option value="9">9</option>
                         <option value="10">10</option>
                         </select>
                    <!--end::Input-->
                    </div>
                    <!--end::Col-->

                    <h1></h1>

                    <!--begin::Col-->
                    <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Altri dettagli</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                     <!-- Altri dettagli Checkbox -->
                      <div class="d-flex flex-column mb-7 fv-row"><label class="fs-6 fw-semobold mb-2"></label>
                       <!-- Lista di Checkbox per "Altri Dettagli" -->
                       <div class="d-flex flex-column">
                         <div class="d-flex align-items-center mb-3">
                         <input type="checkbox" v-model="formData.moredetails['Box o Garage']" id="box-o-garage" />
                         <label for="box-o-garage" class="ms-2">Box o Garage</label>
                         </div>
                         <div class="d-flex align-items-center mb-3">
                         <input type="checkbox" v-model="formData.moredetails['Magazzino - Deposito']"  id="magazzino-deposito" />
                         <label for="magazzino-deposito" class="ms-2">Magazzino - Deposito</label>
                         </div>
                         <div class="d-flex align-items-center mb-3">
                         <input type="checkbox" v-model="formData.moredetails['Terrazzo']" id="terrazzo" />
                         <label for="terrazzo" class="ms-2">Terrazzo</label>
                         </div>
                         <div class="d-flex align-items-center mb-3">
                         <input type="checkbox" v-model="formData.moredetails['Balcone']" id="balcone" />
                         <label for="balcone" class="ms-2">Balcone</label>
                         </div>
                         <div class="d-flex align-items-center mb-3">
                         <input type="checkbox" v-model="formData.moredetails['Giardino']" id="giardino" />
                         <label for="giardino" class="ms-2">Giardino</label>
                         </div>
                       </div>
                      </div>
                      <!--end::Input-->
                    </div>
                    <!--end::Col-->

                  <!--begin::Input group-->
              <div class="row g-9 mb-7">
                  <!--begin::Col-->
                   <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Camere da letto</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="bedrooms">
                      <el-input v-model="formData.bedrooms" type="number" />
                    </el-form-item>
                    <!--end::Input-->
                   </div>
                  <!--end::Col-->
              </div>

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Locali</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="warehouserooms">
                      <el-input v-model="formData.warehouseRooms" type="number" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                 <!--begin::Input group-->
                 <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Cucine</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="kitchens">
                      <el-input v-model="formData.kitchens" type="number" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                 </div>

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Bagni</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="bathrooms">
                      <el-input v-model="formData.bathrooms" type="number" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

              <!--begin::Input group-->
              <div  class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="">Arredamento</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Seleziona il tipo di arredamento"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control" v-model="formData.furniture">
                  <option value="">Seleziona il tipo di arredamento</option>
                  <option value="Arredato">Arredato</option>
                  <option value="Non Arredato">Non Arredato</option>
                  <option value="Parzialmente Arredato">Parzialmente Arredato</option>
                  <option value="Arredato Solo Cucina">Arredato Solo Cucina</option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

                    <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <label class="fs-6 fw-semobold mb-2">Altre Caratteristiche</label>
                    <div class="d-flex flex-column">
                      <div class="d-flex align-items-center mb-3">
                      <input type="checkbox" v-model="formData.otherFeatures['Giardino Comune']" id="giardino-comune" />
                      <label for="giardino-comune" class="ms-2">Giardino Comune</label>
                      </div>
                      <div class="d-flex align-items-center mb-3">
                      <input type="checkbox" v-model="formData.otherFeatures['Piscina']" id="piscina" />
                      <label for="piscina" class="ms-2">Piscina</label>
                      </div>
                      <div class="d-flex align-items-center mb-3">
                      <input type="checkbox" v-model="formData.otherFeatures['Accesso per disabili']" id="accesso-disabili" />
                      <label for="accesso-disabili" class="ms-2">Accesso per disabili</label>
                      </div>
                      <div class="d-flex align-items-center mb-3">
                      <input type="checkbox" v-model="formData.otherFeatures['Impianti di allarme']" id="impianti-allarme" />
                      <label for="impianti-allarme" class="ms-2">Impianti di allarme</label>
                      </div>
                      <div class="d-flex align-items-center mb-3">
                      <input type="checkbox" v-model="formData.otherFeatures['Reception']" id="reception" />
                      <label for="reception" class="ms-2">Reception</label>
                      </div>
                    </div>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Posti Auto</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="parkingSpaces">
                      <el-input v-model="formData.parkingSpaces" type="number"/>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                <div class="col-md-6 fv-row">
                    <label class="fs-6 fw-semobold mb-2">Riscaldamento</label>
                  <div class="d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                    <input type="checkbox" v-model="formData.heating['Autonomo']" id="autonomo" />
                    <label for="autonomo" class="ms-2">Autonomo</label>
                    </div>
                    <div class="d-flex align-items-center mb-3">
                    <input type="checkbox" v-model="formData.heating['Centralizzato']" id="centralizzato" />
                    <label for="centralizzato" class="ms-2">Centralizzato</label>
                    </div>
                    <div class="d-flex align-items-center mb-3">
                    <input type="checkbox" v-model="formData.heating['Assente']" id="assente" />
                    <label for="assente" class="ms-2">Assente</label>
                    </div>
                 </div>
                  <!--end::Col-->
                </div>

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                     <label class="fs-6 fw-semobold mb-2">Esposizione</label>
                      <div class="d-flex flex-column">
                       <div class="d-flex align-items-center mb-3">
                       <input type="checkbox" v-model="formData.exposure['Nord']" id="nord" />
                       <label for="nord" class="ms-2">Nord</label>
                       </div>
                       <div class="d-flex align-items-center mb-3">
                       <input type="checkbox" v-model="formData.exposure['Sud']" id="sud" />
                       <label for="sud" class="ms-2">Sud</label>
                       </div>
                       <div class="d-flex align-items-center mb-3">
                       <input type="checkbox" v-model="formData.exposure['Ovest']" id="ovest" />
                       <label for="ovest" class="ms-2">Ovest</label>
                       </div>
                       <div class="d-flex align-items-center mb-3">
                       <input type="checkbox" v-model="formData.exposure['Est']" id="est" />
                       <label for="est" class="ms-2">Est</label>
                       </div>
                      </div>
                  </div>
                  <!--end::Col-->

                <!--begin::Input group-->
                <div  class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="">Classe energetica</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Seleziona il tipo di Classe energetica"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control" v-model="formData.energyClass">
                  <option value="">Seleziona il tipo di Classe energetica</option>
                  <option value="Proprietà Esente">Proprietà Esente</option>
                  <option value="Non classificabile">Non classificabile</option>
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                  <option value="A2">A2</option>
                  <option value="A1">A1</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <!--end::Input-->
               </div>
               <!--end::Input group-->

               <!--begin::Input group-->
               <div  class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="">Indica il tipo di proprietà</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Seleziona il tipo di proprietà"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control" v-model="formData.typeOfProperty">
                  <option value="">Seleziona il tipo di proprietà</option>
                  <option value="Intera Proprietà">Intera Proprietà</option>
                  <option value="Nuda Proprietà">Nuda Proprietà</option>
                  <option value="Parziale Proprietà">Parziale Proprietà</option>
                  <option value="Usufrutto">Usufrutto</option>
                  <option value="Multiproprietà">Multiproprietà</option>
                  <option value="Diritto di Superficie">Diritto di Superficie</option>
                  </select>
                <!--end::Input-->
               </div>
               <!--end::Input group-->

               <!--begin::Input group-->
               <div  class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="">Stato dell'immobile</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Seleziona lo Stato dell'immobile"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control" v-model="formData.stateOfTheProperty">
                  <option value="">Seleziona lo Stato dell'immobile</option>
                  <option value="Nuovo / In Costruzione">Nuovo / In Costruzione</option>
                  <option value="Ottimo / Ristrutturato">Ottimo / Ristrutturato</option>
                  <option value="Buono / Abitabile">Buono / Abitabile</option>
                  <option value="Da Ristrutturare">Da Ristrutturare</option>
                  </select>
                <!--end::Input-->
               </div>
               <!--end::Input group-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Anno di costruzione</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="yearOfConstruction">
                      <el-input v-model="formData.yearOfConstruction" type="number"/>
                    </el-form-item>
                    <!--end::Input-->
                </div>
                <!--end::Col-->
           </div>
                   <!--begin::Billing toggle-->
                 <div
                  class="fw-bold fs-3 rotate collapsible mb-7"
                  data-bs-toggle="collapse"
                  href="#kt_modal_add_property_billing_info4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="kt_property_view_details">
                  Prezzi e Descrizione
                  <span class="ms-2 rotate-180">
                   <KTIcon icon-name="down" icon-class="fs-3" />
                 </span>
                 </div>
                 <!--end::Billing toggle-->

            <div id="kt_modal_add_property_billing_info4" class="collapse show">

                
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Prezzo</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="price">
                      <el-input v-model="formData.price" type="number" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2"
                      >Spese condominiali</label                    >
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="condominiumExpenses">
                      <el-input v-model="formData.condominiumExpenses" type="number" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Input group-->
               <div  class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="">Disponibilità</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Seleziona la Disponibilità"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control" v-model="formData.availability">
                  <option value="">Seleziona la Disponibilità</option>
                  <option value="Libero">Libero</option>
                  <option value="Occupato">Occupato</option>
                  </select>
                <!--end::Input-->
               </div>
               <!--end::Input group-->

                 <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">Descrizione</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="description">
                  <el-input v-model="formData.description" type="text" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

            <!-- <form ref="formRef" @submit.prevent="submit">
              <div class="form-group">
                <label for="file-upload">Carica foto:</label>
                <input type="file" id="file-upload" @change="onFileChanged"/>
             </div>
               <button type="button" @click="onUpload" class="btn btn-primary"> Upload!</button>
               <button type="submit" :disabled="loading">Invia</button>
            </form> -->
            <input type="file" multiple @change="onFileChanged">

           
            </div>
           <!--end::Modal body-->

                  <!--begin::Modal footer-->
                    <div class="modal-footer flex-center">
                     <!--begin::Button-->
                     <button
                       type="reset"
                       id="kt_modal_add_property_cancel"
                       class="btn btn-light me-3">
                        Scarta
                      </button>
                     <!--end::Button-->

                     <!--begin::Button-->
                        <button
                         :data-kt-indicator="loading ? 'on' : null"
                         class="btn btn-lg btn-primary"
                         type="submit">
                          <span v-if="!loading" class="indicator-label">
                            Salva
                           <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
                            </span>
                            <span v-if="loading" class="indicator-progress">
                            Attendere...
                            <span
                           class="spinner-border spinner-border-sm align-middle ms-2"
                          ></span>
                           </span>
                        </button>
                      <!--end::Button-->
                   </div>
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";


export default defineComponent({
  name: "add-property-modal",
  components: {},
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addPropertyModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      state:"",
      description: "",
      addressLine: "",
      town: "",
      postCode: null,
      commercialSurfaceate:null,
      category:"",
      typology: "",
      floor:"",
      totalBuildingFloors:null,
      elevators:"",
      status:"",
      bedrooms:null,
      warehouseRooms:"",
      kitchens:null,
      bathrooms:null,
      furniture:"",
      parkingSpaces:null,
      energyClass:"",
      stateOfTheProperty:{
                     "Nuovo / In Costruzione":false,
                     "Ottimo / Ristrutturato":false,
                     "Buono / Abitabile":false,
                     "Da Ristrutturare":false,
                         },
      yearOfConstruction:null,
      price:null,
      condominiumExpenses:null,
      availability:"",
      inHome:"",
      highlighted:"",
      typeOfProperty:{
                    "Intera Proprietà":false,
                    "Nuda Proprietà":false,
                    "Parziale Proprietà":false,
                    "Usufrutto":false,
                    "Multiproprietà":false,
                    "Diritto di Superficie":false,
                  },
      exposure:{
                    "Nord": false,
                    "Sud": false,
                    "Ovest": false,
                    "Est": false,
                  },
      heating:{
                    "Autonomo": false,
                    "Centralizzato": false,
                    "Assente": false,
                  },
      moredetails:{
                    "Box o Garage": false,
                    "Magazzino - Deposito": false,
                    "Terrazzo": false,
                    "Balcone": false,
                    "Giardino": false,
                  },
      otherFeatures:{
                    "Giardino Comune": false,
                    "Piscina": false,
                    "Accesso per disabili": false,
                    "Impianti di allarme": false,
                    "Reception": false,
                  },            
    });
    const showTipologia = ref(false);
    const typesavailable = ref<string[]>([]);
    const selectedFile = ref<FileList | null>(null);
    const onFileChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        selectedFile.value = target.files;
      }
    };

     const tipologiePerCategoria = {
      Residenziale: ["Appartamento", "Attico", "Mansarda", "Loft", "Soffitta","Casale","Rustico","Villa Unifamiliare","Villa Bifamiliare","Villa Plurifamiliare","Villa a Schiera"],
      Garage: ["Box singolo", "Box doppio", "Posto auto"],
      Terreno: ["Edificabile", "Agricolo", "Non Edificabile"]
    };

    watch(
      () => formData.value.category,
      (newCategoria) => {
        if (newCategoria && tipologiePerCategoria[newCategoria]) {
          typesavailable.value = tipologiePerCategoria[newCategoria];
          showTipologia.value = true;
        } else {
          showTipologia.value = false;
          formData.value.typology = ""; // Resetta il valore di tipologia
          typesavailable.value = [];
        }
      }
    );

    const rules = ref({
      category: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      typology: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      status: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      addressLine: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      town: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      state: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      postCode: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      commercialSurfaceate: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      floor: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      totalBuildingfloors: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      price: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true;
          console.log(JSON.stringify( formData.value))
          ApiService.post("https://localhost:7267/api/RealEstateProperty/Create", formData.value)
          setTimeout(() => {
            loading.value = false;
            Swal.fire({
              text: "Il modulo è stato inviato con successo!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, capito!",
              heightAuto: false,
              customClass: {
              confirmButton: "btn btn-primary",
              },
            }).then(() => {
              hideModal(addPropertyModalRef.value);
            });
          }, 2000);
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
          return false;
        }
      });
    };


    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addPropertyModalRef,
      getAssetPath,
      countries,
      showTipologia,
      typesavailable, 
      selectedFile,
      onFileChanged,
    };
  },
});
</script>
