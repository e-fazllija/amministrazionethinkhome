<template>
  <div class="modal fade" id="kt_modal_add_property" ref="addPropertyModalRef" tabindex="-1" aria-hidden="true">
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
          ref="formRef" 
          enctype="multipart/form-data"
           >
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

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                      <span class="required">Agente</span>
                        <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"></i>
                     </label>
                   <!--end::Label-->
                   <!--begin::Input-->
                    <select class="form-control" v-model="formData.AgentId">
                     <option v-for="(user, index) in inserModel.Users" :key="index" :value="user.Id">{{ user.Name }} {{ user.LastName }}</option>
                    </select>
                   <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                      <span class="required">Cliente</span>
                        <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"></i>
                     </label>
                   <!--end::Label-->
                   <!--begin::Input-->
                   <select class="form-control" v-model="formData.CustomerId">
                     <option v-for="(user, index) in inserModel.Customers" :key="index" :value="user.Id">{{ user.Name }} {{ user.LastName }}</option>
                    </select>
                   <!--end::Input-->
                  </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Titolo</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="Title">
                    <el-input v-model="formData.Title" type="text"/>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Titolo Breve / Homepage e lista</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="ShortTitle">
                    <el-input v-model="formData.ShortTitle" type="text"/>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-2 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-semobold mb-2">Descrizione</label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <el-form-item prop="Description">
                          <el-input v-model="formData.Description" type="text" />
                        </el-form-item>
                        <!--end::Input-->
                      </div>
                      <!--end::Input group-->
                      
                      <!--begin::Input group-->
                  <div class="d-flex flex-column mb-2 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-semobold mb-2">Descrizione Breve / Homepage e lista</label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <el-form-item prop="ShortDescription">
                          <el-input v-model="formData.ShortDescription" type="text" />
                        </el-form-item>
                        <!--end::Input-->
                      </div>
                      <!--end::Input group-->

                      <!--begin::Col-->
                      <div class="d-flex flex-column mb-2 fv-row">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semobold mb-2"
                              >Prezzo</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <el-form-item prop="Price">
                              <el-input v-model="formData.Price" type="number" />
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Col-->

                          <!--begin::Col-->
                      <div class="d-flex flex-column mb-2 fv-row">
                            <!--begin::Label-->
                            <label class="col-lg-4 col-form-label fw-semobold fs-6">Data fine incarico</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <el-form-item prop="AssignmentEnd">
                              <el-input v-model="formData.AssignmentEnd" type="date" />
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Col-->
                          
                               <!--begin::Col-->
                      <div class="d-flex flex-column mb-2 fv-row">
                            <!--begin::Label-->
                            <label class="col-lg-4 col-form-label fw-semobold fs-6">Asta</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <div class="form-check form-switch form-check-custom form-check-solid">
                              <input class="form-check-input" type="checkbox" value="" v-model="formData.Auction" />
                            </div>
                            <!--end::Input-->
                          </div>
                          <!--end::Col-->

      <!--begin::Col-->
      <div class="d-flex flex-column mb-2 fv-row">
                            <!--begin::Label-->
                            <label class="col-lg-4 col-form-label fw-semobold fs-6">Venduto</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <div class="form-check form-switch form-check-custom form-check-solid">
                              <input class="form-check-input" type="checkbox" value="" v-model="formData.Sold" />
                            </div>
                            <!--end::Input-->
                          </div>
                          <!--end::Col-->

                          <!--begin::Col-->
      <div class="d-flex flex-column mb-2 fv-row">
                            <!--begin::Label-->
                            <label class="col-lg-4 col-form-label fw-semobold fs-6">Imposta in home</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <div class="form-check form-switch form-check-custom form-check-solid">
                              <input class="form-check-input" type="checkbox" value="" v-model="formData.InHome" />
                            </div>
                            <!--end::Input-->
                          </div>
                          <!--end::Col-->

                                     <!--begin::Col-->
      <div class="d-flex flex-column mb-2 fv-row">
                            <!--begin::Label-->
                            <label class="col-lg-4 col-form-label fw-semobold fs-6">Imposta in evidenza</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <div class="form-check form-switch form-check-custom form-check-solid">
                              <input class="form-check-input" type="checkbox" value="" v-model="formData.Highlighted" />
                            </div>
                            <!--end::Input-->
                          </div>
                          <!--end::Col-->

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
                        <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" ></i>
                     </label>
                   <!--end::Label-->
                   <!--begin::Input-->
                     <select class="form-control" v-model="formData.Category">
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
                   <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"></i>
                   </label>
                  <select class="form-control" v-model="formData.Typology">
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
                  <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"></i>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-control" v-model="formData.Status">
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
                  <el-form-item prop="AddressLine">
                    <el-input v-model="formData.AddressLine" type="text"/>
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
                  <el-form-item prop="Town">
                    <el-input v-model="formData.Town" type="text"/>
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
                    <el-form-item prop="State">
                      <el-input v-model="formData.State" type="text"/>
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
                    <el-form-item prop="PostCode">
                      <el-input v-model="formData.PostCode" type="number"/>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Input group-->
              </div>

                <div
                    class="fw-bold fs-3 rotate collapsible mb-7"
                    data-bs-toggle="collapse"
                    href="#kt_modal_add_property_billing_info3"
                    role="button"
                    aria-expanded="true"
                    aria-controls="kt_property_view_details">Caratteristiche
                    <span class="ms-2 rotate-180">
                    <KTIcon icon-name="down" icon-class="fs-3" />
                    </span>
                  </div>
                  <!--end::Billing toggle-->
                    <div id="kt_modal_add_property_billing_info3" class="collapse show">

                      <!--begin::Col-->
                      <div class="col-md-6 fv-row">
                            <!--begin::Label-->
                            <label class="fs-6 fw-semobold mb-2"
                              >Spese condominiali</label                    >
                            <!--end::Label-->
                            <!--begin::Input-->
                            <el-form-item prop="CondominiumExpenses">
                              <el-input v-model="formData.CondominiumExpenses" type="number" />
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Col-->

                            <!--begin::Input group-->
                            <div class="row g-9 mb-7">
                            <!--begin::Col-->
                            <div class="d-flex flex-column mb-7 fv-row">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-semobold mb-2"
                                >Superficie commerciale (m²)</label>
                              <!--end::Label-->
                              <!--begin::Input-->
                              <el-form-item prop="CommercialSurfaceate">
                                <el-input v-model="formData.CommercialSurfaceate" type="number" />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Col-->
                            </div>

                                <!--begin::Col-->
                                <div class="col-md-6 fv-row">
                                  <!--begin::Label-->
                                  <label class="fs-6 fw-semobold mb-2"
                                  >Piano </label>
                                  <!--end::Label-->
                                  <!--begin::Input-->
                                  <select class="form-control"  v-model="formData.Floor">
                                  <option value>Scegli</option>
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
                                <el-form-item prop="TotalBuildingfloors">
                                <el-input v-model="formData.TotalBuildingfloors" type="number" />
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
                              <el-form-item prop="Elevators">
                                    <el-input v-model="formData.Elevators" type="number" />
                                  </el-form-item>
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
                                <div class="d-flex flex-column mb-7 fv-row">
                                  <label class="fs-6 fw-semobold mb-2"></label>
                                  <!--begin::Input-->
                                  <el-form-item prop="MoreDetails">
                                    <el-input v-model="formData.MoreDetails" type="text" />
                                  </el-form-item>
                                  <!--end::Input-->
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
                              <el-form-item prop="Bedrooms">
                                <el-input v-model="formData.Bedrooms" type="number" />
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
                              <el-form-item prop="WarehouseRooms">
                                <el-input v-model="formData.WarehouseRooms" type="number" />
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
                              <el-form-item prop="Kitchens">
                                <el-input v-model="formData.Kitchens" type="number" />
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
                              <el-form-item prop="Bathrooms">
                                <el-input v-model="formData.Bathrooms" type="number" />
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
                            ></i>
                          </label>
                          <!--end::Label-->
                          <!--begin::Input-->
                          <select class="form-control" v-model="formData.Furniture">
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
                               <!--begin::Input-->
                               <el-form-item prop="MoreDetails">
                                    <el-input v-model="formData.MoreDetails" type="text" />
                                  </el-form-item>
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
                              <el-form-item prop="ParkingSpaces">
                                <el-input v-model="formData.ParkingSpaces" type="number"/>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Col-->

                            <!--begin::Input group-->
                        <div  class="fv-row mb-7">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semobold mb-2">
                            <span class="">Riscaldamento</span>
                            <i class="fas fa-exclamation-circle ms-1 fs-7"
                              data-bs-toggle="tooltip"
                              ></i>
                          </label>
                          <!--end::Label-->
                          <!--begin::Input-->
                          <select class="form-control" v-model="formData.Heating">
                            <option value="Nessuno">Nessuno</option>
                            <option value="Autonomo">Autonomo</option>
                            <option value="Centralizzato">Centralizzato</option>
                          </select>
                          <!--end::Input-->
                        </div>
                        <!--end::Input group-->

                          <!--begin::Input group-->
                          <div  class="fv-row mb-7">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semobold mb-2">
                            <span class="">Esposizione</span>
                            <i class="fas fa-exclamation-circle ms-1 fs-7"
                              data-bs-toggle="tooltip"
                              ></i>
                          </label>
                          <!--end::Label-->
                          <!--begin::Input-->
                          <select class="form-control" v-model="formData.Exposure">
                            <option value="">Selezionare l'esposizione</option>
                            <option value="Nord">Nord</option>
                            <option value="Sud">Sud</option>
                            <option value="Est">Est</option>
                            <option value="Ovest">Ovest</option>
                          </select>
                          <!--end::Input-->
                        </div>
                        <!--end::Input group-->

                          <!--begin::Input group-->
                          <div  class="fv-row mb-7">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semobold mb-2">
                            <span class="">Classe energetica</span>
                            <i class="fas fa-exclamation-circle ms-1 fs-7"
                              data-bs-toggle="tooltip"
                              ></i>
                          </label>
                          <!--end::Label-->
                          <!--begin::Input-->
                          <select class="form-control" v-model="formData.EnergyClass">
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
                              ></i>
                          </label>
                          <!--end::Label-->
                          <!--begin::Input-->
                          <select class="form-control" v-model="formData.TypeOfProperty">
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
                              ></i>
                          </label>
                          <!--end::Label-->
                          <!--begin::Input-->
                          <select class="form-control" v-model="formData.StateOfTheProperty">
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
                              <el-form-item prop="YearOfConstruction">
                                <el-input v-model="formData.YearOfConstruction" type="number"/>
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
                            ></i>
                        </label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <select class="form-control" v-model="formData.Availability">
                          <option value="Libero">Libero</option>
                          <option value="Occupato">Occupato</option>
                          </select>
                        <!--end::Input-->
                      </div>
                      <!--end::Input group-->

                    </div>

                    <div class="fv-row mb-15">
                        <!--begin::Label-->
                        <label class="fs-6 fw-semobold mb-2">Immagini</label>
                        <!--end::Label-->
                        <input class="form-control" type="file" multiple @change="onFileChanged">
                       
                      </div>
                      <!--end::Input group-->
                  <!--end::Modal body-->
                </div>
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
import { defineComponent, ref, watch, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {createRealEstateProperty, RealEstateProperty, getToInsert, InsertModel } from "@/core/data/properties";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "add-property-modal",
  components: {},
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addPropertyModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const loading = ref<boolean>(false);
    const formData = ref<RealEstateProperty>({
      Title: "",
      ShortTitle: "",
      Category: "Residenziale",
      Typology: "Appartamento",
      InHome: false,
      Highlighted: false,
      Auction: false,
      Sold: false,
      Status: "Vendita",
      AddressLine: "",
      Town: "",
      State: "",
      PostCode: "",
      CommercialSurfaceate: 0,
      TotalBuildingfloors: 0,
      Elevators: 0,
      MoreDetails: "",
      Bedrooms: 0,
      WarehouseRooms: 0,
      Kitchens: 0,
      Bathrooms: 0,
      Furniture: "",
      OtherFeatures: "",
      ParkingSpaces: 0,
      Heating: "",
      Exposure: "",
      EnergyClass: "",
      TypeOfProperty: "",
      StateOfTheProperty: "",
      YearOfConstruction: 0,
      Price: 0,
      CondominiumExpenses: 0,
      Availability: "",
      Description: "",
      ShortDescription: "",
      CustomerId: 0,
      AgentId: "",
      AssignmentEnd: "",
      Agent: null
    });
    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: []
    });
    const showTipologia = ref(true);
    
    const selectedFile = ref<FileList | null>(null);
    const onFileChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        formData.value.Files = target.files;
      }
    };

     const tipologiePerCategoria = {
      Residenziale: ["Appartamento", "Attico", "Mansarda", "Loft", "Soffitta","Casale","Rustico","Villa Unifamiliare","Villa Bifamiliare","Villa Plurifamiliare","Villa a Schiera"],
      Garage: ["Box singolo", "Box doppio", "Posto auto"],
      Terreno: ["Edificabile", "Agricolo", "Non Edificabile"]
    };

    const typesavailable = ref<string[]>(tipologiePerCategoria[formData.value.Category]);

    watch(
      () => formData.value.Category,
      (newCategoria) => {
        if (newCategoria && tipologiePerCategoria[formData.value.Category]) {
          typesavailable.value = tipologiePerCategoria[formData.value.Category];
          showTipologia.value = true;
        } else {
          showTipologia.value = false;
          formData.value.Typology = "";
          typesavailable.value = [];
        }
      }
    );

    const rules = ref({
      Title: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      ShortTitle: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Descriptio: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      ShortDescriptio: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      AddressLine: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Town: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      State: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      PostCode: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      CommercialSurfaceate: [
        {
          required: false,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      TotalBuildingfloors: [
        {
          required: false,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Price: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
    });

    onMounted(async () => {
      inserModel.value = await getToInsert();
      if(inserModel.value.Customers.length > 0){
        formData.value.CustomerId = inserModel.value.Customers[0].Id;
      }
      if(inserModel.value.Users.length > 0){
        formData.value.AgentId = store.user.Id;
      }
    })

    const submit = async () => {
      if (!formRef.value) {
        return;
      }
      await formRef.value.validate( async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          await createRealEstateProperty(formData.value);

          const error = store.errors;

          if (!error) {
            Swal.fire({
              text: "Operazione completata!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(function () {
              loading.value = false;
              hideModal(addPropertyModalRef.value);
              emit('formAddSubmitted', formData.value);
            });
        } else {
          loading.value = false;
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
      inserModel
    };
  },
});
</script>
