<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Aggiorna Immobili</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
  </div>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!--begin::Content-->
  <div v-else class="collapse show">
    <!--begin::Form-->
    <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef" enctype="multipart/form-data">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Cliente</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <!--begin::Input group-->
            <Multiselect v-model="formData.CustomerId" :options="inserModel.Customers" label="label" valueProp="Id"
              :searchable="true" :close-on-select="true" :clear-on-select="false" placeholder="Seleziona il cliente" />
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Agente</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-7 fv-row">
              <!--begin::Input-->
              <select class="form-control" v-model="formData.AgentId" required>
                <option v-for="(user, index) in inserModel.Users" :key="index" :value="user.Id">{{ user.Name }} {{
                  user.LastName }}</option>
              </select>
              <!--end::Input-->
            </div>
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6 required">Titolo</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Title" type="text" required />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Categoria</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Category" class="form-select form-select-lg fw-semobold"
              v-model="formData.Category" required>
              <option value>Seleziona una Categoria...</option>
              <option value="Residenziale">Residenziale</option>
              <option value="Capannone">Capannone</option>
              <option value="Negozi-Locale Commerciale">Negozi/Locale Commerciale</option>
              <option value="Magazzino">Magazzino</option>
              <option value="Garage">Garage</option>
              <option value="Ufficio">Ufficio</option>
              <option value="Terreno">Terreno</option>
              <option value="Rustico / Casale">Rustico / Casale</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->
        <!--begin::Input group Tipologia-->
        <div v-if="showTipologia" class="d-flex flex-column mb-7 fv-row">
          <label class="fs-6 fw-semobold mb-2">
            <span class="required">Tipologia</span>
            <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
              title="Seleziona una tipologia di immobile"></i>
          </label>
          <select class="form-control" v-model="formData.Typology">
            <option v-for="tipologia in typesavailable" :key="tipologia" :value="tipologia">
              {{ tipologia }}
            </option>
          </select>
        </div>
        <!--end::Input group Tipologia-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Stato vendita o affitto</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Status" class="form-select form-select-lg fw-semobold" v-model="formData.Status"
              required>
              <option value="">Scegli tra vendita e affitto</option>
              <option value="Vendita">Vendita</option>
              <option value="Affitto">Affitto</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Indirizzo</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.AddressLine" type="text"
              required />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

                <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Provincia</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select class="form-control" v-model="formData.State" required>
              <option value="">Seleziona provincia</option>
              <option v-for="(province, index) in provinces" :key="index" :value="province.Name">{{ province.Name }}</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6 required">Comune</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <select class="form-select" v-model="formData.Town" required>
                <option value="">Seleziona città</option>
                <option v-for="(city, index) in cities" :key="index" :value="city.Name">{{ city.Name }}</option>
              </select>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

         <!--begin::Input group-->
         <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6 required">Località</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <select class="form-control" v-model="formData.Location">
                <option value="">Seleziona località</option>
                <option v-for="(location, index) in locations" :key="index" :value="location.Name">{{ location.Name }}</option>
              </select>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Codice Postale</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.PostCode" type="text" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Superficie commerciale (m²)</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.CommercialSurfaceate"
              type="number" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Piano</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Floor" class="form-select form-select-lg fw-semobold" v-model="formData.Floor">
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
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Totale piani edificio</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.TotalBuildingfloors" type="number"
              required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Giardino Mq</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.MQGarden" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Ascensori</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Elevators" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Altri dettagli</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.MoreDetails" type="text" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Camere da letto</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Bedrooms" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Locali</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.WarehouseRooms" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Cucine</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Kitchens" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Bagni</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Bathrooms" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Arredamento</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Furniture" class="form-select form-select-lg fw-semobold"
              v-model="formData.Furniture">
              <option value="">Seleziona il tipo di arredamento</option>
              <option value="Arredato">Arredato</option>
              <option value="Non Arredato">Non Arredato</option>
              <option value="Parzialmente Arredato">Parzialmente Arredato</option>
              <option value="Arredato Solo Cucina">Arredato Solo Cucina</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Altre Caratteristiche</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.MoreDetails" type="text" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Posti Auto</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.ParkingSpaces" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Riscaldamento</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Heating" class="form-select form-select-lg fw-semobold"
              v-model="formData.Heating">
              <option value="Nessuno">Nessuno</option>
              <option value="Autonomo">Autonomo</option>
              <option value="Centralizzato">Centralizzato</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Esposizione</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Exposure" class="form-select form-select-lg fw-semobold"
              v-model="formData.Exposure">
              <option value="">Selezionare l'esposizione</option>
              <option value="Nord">Nord</option>
              <option value="Sud">Sud</option>
              <option value="Est">Est</option>
              <option value="Ovest">Ovest</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Classe energetica</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="EnergyClass" class="form-select form-select-lg fw-semobold"
              v-model="formData.EnergyClass">
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
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Indica il tipo di proprietà</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.TypeOfProperty" type="text" />
            <!-- <select as="select" name="TypeOfProperty" class="form-select form-select-lg fw-semobold"
              v-model="formData.TypeOfProperty">
              <option value="">Seleziona il tipo di proprietà</option>
              <option value="Intera Proprietà">Intera Proprietà</option>
              <option value="Nuda Proprietà">Nuda Proprietà</option>
              <option value="Parziale Proprietà">Parziale Proprietà</option>
              <option value="Usufrutto">Usufrutto</option>
              <option value="Multiproprietà">Multiproprietà</option>
              <option value="Diritto di Superficie">Diritto di Superficie</option>
            </select> -->
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Stato dell'immobile</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="StateOfTheProperty" class="form-select form-select-lg fw-semobold"
              v-model="formData.StateOfTheProperty">
              <option value="">Seleziona lo Stato dell'immobile</option>
              <option value="Nuovo / In Costruzione">Nuovo / In Costruzione</option>
              <option value="Ottimo / Ristrutturato">Ottimo / Ristrutturato</option>
              <option value="Buono / Abitabile">Buono / Abitabile</option>
              <option value="Da Ristrutturare">Da Ristrutturare</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Anno di costruzione</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.YearOfConstruction"
              type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Trattativa riservata</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="isTrattativaRiservata" />
            </div>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div v-if="!isTrattativaRiservata" class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Prezzo</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Price" type="number" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Prezzo Ribassato</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.PriceReduced" type="number"
              required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Spese condominiali</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.CondominiumExpenses"
              type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Disponibilità</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Availability" class="form-select form-select-lg fw-semobold"
              v-model="formData.Availability">
              <option value="">Seleziona la Disponibilità</option>
              <option value="Libero">Libero</option>
              <option value="Occupato">Occupato</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Descrizione</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <textarea class="form-control form-control-lg fw-semobold" v-model="formData.Description"
              type="text"></textarea>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Imposta in Home</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.InHome" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Imposta in Evidenza</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Highlighted" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Asta</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Auction" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">In Trattativa</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Negotiation" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Venduto</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Sold" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Archiviato</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Archived" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Data fine incarico</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.AssignmentEnd" type="date"
              placeholder="yyyy-MM-dd" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="d-flex flex-column mb-7 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-semobold mb-2">
            <span class="required">Tipologia Incarico</span>
            <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"></i>
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <select class="form-control" v-model="formData.TypeOfAssignment">
            <option value="Verbale">Verbale</option>
            <option value="Esclusivo">Esclusivo</option>
            <option value="Semi-Verbale">Semi-Verbale</option>
            <option value="Immobile MLS">Immobile MLS</option>
          </select>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

         <!--begin::Col-->
        <div class="col-md-4 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-semobold mb-2">Provvigione Concordata</label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="AgreedCommission">
            <el-input v-model="formData.AgreedCommission" type="number" placeholder="Inserisci percentuale">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-md-4 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-semobold mb-2">Provvigione Forfettaria</label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="FlatRateCommission">
            <el-input v-model="formData.FlatRateCommission" type="number" placeholder="Inserisci percentuale">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-md-4 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-semobold mb-2">Storno Provvigione</label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="StornoProvvigione">
            <el-input v-model="formData.StornoProvvigione" type="number" placeholder="Inserisci percentuale">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Col-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Url Video</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.VideoUrl" type="text" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Note documentali e varie</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <textarea class="form-control form-control-lg fw-semobold" v-model="formData.DocumentaryNotes" rows="4"></textarea>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Carica immagini</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control" type="file" multiple @change="onFileChanged">
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group Documents-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Carica documenti</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control" type="file" multiple @change="onDocumentChanged" accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar">
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group Documents-->

        <!--begin::Documents List-->
        <div v-if="documents && documents.length > 0" class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Documenti caricati</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="documents-list">
              <div v-for="(doc, index) in documents" :key="index" class="document-item">
                <div class="document-info">
                  <i class="bi bi-file-earmark-text fs-2 me-2"></i>
                  <span class="document-name">{{ getDocumentName(doc.FileName) }}</span>
                </div>
                <div class="document-actions">
                  <button type="button" class="btn btn-sm btn-light-primary me-2" @click="downloadDocument(doc)">
                    <i class="bi bi-download"></i> Scarica
                  </button>
                  <button type="button" class="btn btn-sm btn-light-danger" @click="deleteDocument(doc.Id)">
                    <i class="bi bi-trash"></i> Elimina
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Documents List-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Riepilogo Note</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div v-for="(note, index) in formData.RealEstatePropertyNotes" :key="index" class="col-lg-8 fv-row">
            <div class="border border-secondary" v-html="note.Text"></div>
            <hr>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Photos Gallery-->
        <div class="py-5">
          <div class="rounded border p-10">
            <h4 class="mb-5 fw-bold">Galleria Foto ({{ formData.Photos?.length || 0 }})</h4>
            <div v-if="formData.Photos && formData.Photos.length > 0" class="photo-gallery">
              <draggable 
                :list="formData.Photos" 
                :disabled="false" 
                item-key="Id" 
                class="photo-grid"
                ghost-class="photo-ghost" 
                @start="isDragging = true" 
                @end="isDragging = false" 
                :move="checkMove" 
                :animation="300">
                <template #item="{ element, index }">
                  <div class="photo-item" @click="openPhotoModal(index)">
                    <div class="photo-thumbnail">
                      <img :src="element.Url" alt="" class="photo-img">
                      <div class="photo-overlay">
                        <i class="bi bi-eye fs-1 text-white"></i>
                      </div>
                      <div class="photo-badges">
                        <span class="badge badge-order">{{ index + 1 }}</span>
                        <span v-if="element.Highlighted" class="badge badge-primary">
                          <i class="bi bi-star-fill"></i> Principale
                        </span>
                      </div>
                      <div class="photo-drag-handle">
                        <i class="bi bi-grip-vertical"></i>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            <div v-else class="text-center py-10">
              <i class="bi bi-images fs-3x text-muted mb-3"></i>
              <p class="text-muted">Nessuna foto caricata</p>
            </div>
          </div>
        </div>
        <!--end::Photos Gallery-->

      </div>
      <div v-if="user.Id === formData.AgentId || user.Role === 'Admin' || formData.Agent.AgencyId === user.Id"
        class="card-footer d-flex justify-content-between py-6 px-9">
        <div>
          <AddNewForm :realEstatePropertyId="id" />
          <button type="button" class="btn btn-info btn-active-light-primary me-2" data-bs-toggle="modal"
            data-bs-target="#kt_modal_scheda">
            <KTIcon icon-name="file" icon-class="fs-2 me-1" />
            Scheda
          </button>
          <AddNewPreventive />
          <!-- <button type="button" class="btn btn-info btn-active-light-primary" data-bs-toggle="modal"
            data-bs-target="#kt_modal_preventivo">
            <KTIcon icon-name="calculator" icon-class="fs-2 me-1" />
            Preventivo
          </button> -->
        </div>
        <div>
          <button v-if="user.Role === 'Admin' || (user.Role === 'Agenzia' && user.Id === formData.Agent.AgencyId )" type="button" @click="deleteItem()"
            class="btn btn-danger btn-active-light-primary me-2">
            Elimina
          </button>
          <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
            <span v-if="!loading" class="indicator-label">
              Salva modifiche
            </span>
            <span v-if="loading" class="indicator-progress">
              Attendere...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
      </div>
      <!--end::Actions-->
    </el-form>
    <!--end::Form-->

    <!--begin::Photo Modal-->
    <div v-if="showPhotoModal" class="photo-modal" @click.self="closePhotoModal">
      <div class="photo-modal-content">
        <button type="button" class="photo-modal-close" @click.stop="closePhotoModal">
          <i class="bi bi-x-lg"></i>
        </button>
        
        <button 
          type="button"
          v-if="currentPhotoIndex > 0" 
          class="photo-modal-nav photo-modal-prev" 
          @click.stop="previousPhoto">
          <i class="bi bi-chevron-left"></i>
        </button>
        
        <button 
          type="button"
          v-if="currentPhotoIndex < formData.Photos.length - 1" 
          class="photo-modal-nav photo-modal-next" 
          @click.stop="nextPhoto">
          <i class="bi bi-chevron-right"></i>
        </button>

        <div class="photo-modal-image-wrapper">
          <img :src="currentPhoto?.Url" alt="" class="photo-modal-image">
        </div>

        <div class="photo-modal-info">
          <div class="photo-modal-counter">
            {{ currentPhotoIndex + 1 }} / {{ formData.Photos.length }}
          </div>
          
          <div v-if="user.Id === formData.AgentId || user.Role === 'Admin' || formData.Agent?.AgencyId === user.Id" class="photo-modal-actions">
            <button 
              v-if="!currentPhoto?.Highlighted" 
              type="button" 
              class="btn btn-primary" 
              @click.stop="setPhotoHighlighted(currentPhoto.Id)">
              <i class="bi bi-star"></i> Imposta come Principale
            </button>
            <span v-else class="badge badge-lg badge-light-primary">
              <i class="bi bi-star-fill"></i> Immagine Principale
            </span>
            <button 
              type="button" 
              class="btn btn-danger ms-3" 
              @click.stop="confirmDeletePhoto(currentPhoto.Id)">
              <i class="bi bi-trash"></i> Elimina
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end::Photo Modal-->
  </div>
  <!--end::Content-->
</template>

<script lang="ts">
import AddNewForm from "@/components/modals/forms/AddNewForm.vue";
import AddNewPreventive from "@/components/modals/forms/AddNewPreventive.vue";
import { getAssetPath } from "@/core/helpers/assets";
import { getProvincesForSelect, getCitiesByProvinceName, getLocationsByCityName } from "@/core/data/locations";
import { defineComponent, onMounted, ref, watch, nextTick, computed } from "vue";
import "@/assets/css/properties-update.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  updateRealEstateProperty,
  RealEstateProperty,
  getRealEstateProperty,
  setRealEstatePropertyPhotoHighlighted,
  deletePhoto,
  deleteRealEstateProperty,
  uploadFiles,
  InsertModel,
  getToInsert,
  updatePhotosOrder,
  uploadPropertyDocument,
  getPropertyDocuments,
  getDocumentDownloadUrl,
  deletePropertyDocument,
  Documentation
} from "@/core/data/properties";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import draggable from 'vuedraggable';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "update",
  components: { draggable, Multiselect, AddNewForm, AddNewPreventive },
  setup() {
    const store = useAuthStore();
    const user = store.user;
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id.toString());
    const formRef = ref<null | HTMLFormElement>(null);
    const updateModalRef = ref<null | HTMLElement>(null);
    const typesavailable = ref<string[]>([]);
    const provinces = ref<Array<{Id: string, Name: string}>>([]);
    const cities = ref<Array<{Id: string, Name: string}>>([]);
    const locations = ref<Array<{Id: string, Name: string}>>([]);
    const showTipologia = ref(false);
    const loading = ref<boolean>(true);
    const firtLoad = ref(false);
    const isTrattativaRiservata = ref(false);
    const documents = ref<Documentation[]>([]);
    const showPhotoModal = ref(false);
    const currentPhotoIndex = ref(0);
    const isDragging = ref(false);
    const documentsLoaded = ref(false);

    // Funzioni per caricare i dati dal database
    // La cache è gestita a livello di modulo in locations.ts per evitare chiamate duplicate
    const loadProvinces = async () => {
      try {
        const provincesData = await getProvincesForSelect();
        provinces.value = provincesData;
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      }
    };

    const loadCitiesByProvince = async (provinceName: string) => {
      try {
        if (provinceName) {
          const citiesData = await getCitiesByProvinceName(provinceName);
          cities.value = citiesData;
        } else {
          cities.value = [];
        }
      } catch (error) {
        console.error("Errore nel caricamento delle città:", error);
        cities.value = [];
      }
    };

    const loadLocationsByCity = async (cityName: string) => {
      try {
        if (cityName) {
          const locationsData = await getLocationsByCityName(cityName);
          locations.value = locationsData;
        } else {
          locations.value = [];
        }
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        locations.value = [];
      }
    };


    const formData = ref<RealEstateProperty>({
      Title: "",
      Category: "",
      Typology: "",
      InHome: false,
      Highlighted: false,
      Auction: false,
      Negotiation: false,
      Sold: false,
      Archived: false,
      Status: "",
      AddressLine: "",
      Town: "",
      State: "",
      Location: "",
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
      PriceReduced: 0,
      MQGarden: 0,
      CondominiumExpenses: 0,
      Availability: "",
      Description: "",
      CustomerId: null,
      AgentId: "",
      AssignmentEnd: "",
      Agent: null,
      VideoUrl: "",
      AgreedCommission: 0,
      FlatRateCommission: 0,
      StornoProvvigione: 0,
      TypeOfAssignment: "",
      DocumentaryNotes: "",
    });

    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: []
    });

    const rules = ref({
      Category: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Typology: [
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
      Floor: [
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
      loading.value = true;
      firtLoad.value = true;
      formData.value = await getRealEstateProperty(id)
      formData.value.AssignmentEnd = formData.value.AssignmentEnd.split('T')[0]
      inserModel.value = await getToInsert(store.user.AgencyId);
      if (inserModel.value.Users.length > 0) {
        formData.value.AgentId = formData.value.AgentId;
      }
      
      // Inizializza la checkbox "Trattativa riservata" in base al prezzo
      isTrattativaRiservata.value = formData.value.Price === -1;
      
      // Carica le province
      await loadProvinces();
      
      // Se c'è già una provincia selezionata, carica le città
      if (formData.value.State) {
        await loadCitiesByProvince(formData.value.State);
      }
      
      // Se c'è già una città selezionata, carica le località
      if (formData.value.Town) {
        await loadLocationsByCity(formData.value.Town);
      }
      
      // Carica i documenti (evita chiamate duplicate)
      if (!documentsLoaded.value) {
        documentsLoaded.value = true;
        documents.value = await getPropertyDocuments(id);
      }
      
      loading.value = false;
      firtLoad.value = false;
    })

     watch(
    () => formData.value.State,
    async (newProvince) => {
      if (!firtLoad.value) {
        console.log("watch state")
        if (newProvince) {
          await loadCitiesByProvince(newProvince);
          formData.value.Town = "";
          formData.value.Location = "";
        } else {
          cities.value = [];
          locations.value = [];
          formData.value.Town = "";
          formData.value.Location = "";
        }
      }
    }
    );
    watch(
    () => formData.value.Town,
    async (newTown) => {
      if (!firtLoad.value) {
        console.log("watch localita")
        if (newTown) {
          await loadLocationsByCity(newTown);
          formData.value.Location = "";
        } else {
          locations.value = [];
          formData.value.Location = "";
        }
      }
    }
);

    const onFileChanged = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        formData.value.Files = target.files;
        await uploadFiles(formData.value.Files, id)
          .then(async () => {
            loading.value = false;
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
              }).then(async function () {
                formData.value = await getRealEstateProperty(id);
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
              return false;
            }
          })
          .catch(({ response }) => {
            console.log(response);
            loading.value = false;
            Swal.fire({
              text: "Attenzione, si è verificato un errore.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          });
      }
    };

    const setPhotoHighlighted = async (photoId) => {
      await setRealEstatePropertyPhotoHighlighted(photoId)
        .then(async () => {
          loading.value = false;
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
            }).then(async function () {
              formData.value = await getRealEstateProperty(id);
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
            return false;
          }
        })
        .catch(({ response }) => {
          console.log(response);
          loading.value = false;
          Swal.fire({
            text: "Attenzione, si è verificato un errore.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        });
    };

    const deleteFile = async (photoId: number) => {
      loading.value = true;
      await deletePhoto(photoId)
        .then(() => {
          loading.value = false;

          Swal.fire({
            text: "Operazione terminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(async () => {
            formData.value = await getRealEstateProperty(id)
          });
        })
        .catch(({ response }) => {
          console.log(response);
          loading.value = false;
          Swal.fire({
            text: "Attenzione, si è verificato un errore.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        });
    }

    watch(
      () => formData.value.AssignmentEnd,
      (newVal) => {
        if (newVal && newVal.includes('T')) {
          formData.value.AssignmentEnd = newVal.split('T')[0]
        }
      },
      { immediate: true }
    )

    async function deleteItem() {
      loading.value = true;
      Swal.fire({
        text: "Confermare l'eliminazione?",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "Continua!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      }).then(async () => {
        loading.value = false;
        await deleteRealEstateProperty(id)
        router.push({ name: "properties" })
      });

    }

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          // Se la checkbox "Trattativa riservata" è selezionata, imposta il prezzo a -1
          if (isTrattativaRiservata.value) {
            formData.value.Price = -1;
          }
          
          await updatePhotosOrder(formData.value.Photos)
          await updateRealEstateProperty(formData.value)
            .then(() => {
              loading.value = false;

              Swal.fire({
                text: "Il modulo è stato inviato con successo!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                // router.push({ name: 'properties' })
              });
            })
            .catch(({ response }) => {
              console.log(response);
              loading.value = false;
              Swal.fire({
                text: "Attenzione, si è verificato un errore.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            });
          loading.value = false;
        } else {
          Swal.fire({
            text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
    };

    async function checkMove(log) {
      // await updatePhotosOrder(formData.value.Photos)
      // console.log(formData.value.Photos)
    }

    const onDocumentChanged = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        loading.value = true;
        
        try {
          const uploadPromises = Array.from(target.files).map(file => 
            uploadPropertyDocument(file, id)
          );
          
          await Promise.all(uploadPromises);
          
          const error = store.errors;
          if (!error) {
            Swal.fire({
              text: "Documenti caricati con successo!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(async function () {
              documents.value = await getPropertyDocuments(id);
              target.value = '';
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
            confirmButtonText: "Continua!",
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
          documents.value = await getPropertyDocuments(id);
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

    const currentPhoto = computed(() => {
      return formData.value.Photos?.[currentPhotoIndex.value];
    });

    const openPhotoModal = (index: number) => {
      if (!isDragging.value) {
        currentPhotoIndex.value = index;
        showPhotoModal.value = true;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyPress);
      }
    };

    const closePhotoModal = () => {
      showPhotoModal.value = false;
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyPress);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showPhotoModal.value) return;
      
      switch (event.key) {
        case 'Escape':
          closePhotoModal();
          break;
        case 'ArrowLeft':
          previousPhoto();
          break;
        case 'ArrowRight':
          nextPhoto();
          break;
      }
    };

    const nextPhoto = () => {
      if (currentPhotoIndex.value < formData.value.Photos.length - 1) {
        currentPhotoIndex.value++;
      }
    };

    const previousPhoto = () => {
      if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
      }
    };

    const confirmDeletePhoto = (photoId: number) => {
      Swal.fire({
        text: "Sei sicuro di voler eliminare questa foto?",
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
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFile(photoId);
          closePhotoModal();
        }
      });
    };

    return {
      id,
      formData,
      rules,
      submit,
      formRef,
      loading,
      updateModalRef,
      getAssetPath,
      onFileChanged,
      typesavailable,
      showTipologia,
      setPhotoHighlighted,
      deleteFile,
      deleteItem,
      inserModel,
      user,
      checkMove,
      provinces,
      cities,
      locations,
      isTrattativaRiservata,
      documents,
      onDocumentChanged,
      downloadDocument,
      deleteDocument,
      getDocumentName,
      showPhotoModal,
      currentPhotoIndex,
      currentPhoto,
      isDragging,
      openPhotoModal,
      closePhotoModal,
      nextPhoto,
      previousPhoto,
      confirmDeletePhoto,
    };
  },
});
</script>

<style scoped>
.documents-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.document-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid var(--bs-gray-300);
  border-radius: 8px;
  background-color: var(--bs-body-bg);
  transition: all 0.3s ease;
}

.document-item:hover {
  border-color: var(--bs-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.document-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.document-name {
  font-weight: 500;
  color: var(--bs-gray-800);
  word-break: break-word;
}

.document-actions {
  display: flex;
  gap: 8px;
}

[data-bs-theme="dark"] .document-item {
  border-color: var(--bs-gray-600);
}

[data-bs-theme="dark"] .document-name {
  color: var(--bs-gray-200);
}

[data-bs-theme="dark"] .document-item:hover {
  border-color: var(--bs-primary);
}
</style>