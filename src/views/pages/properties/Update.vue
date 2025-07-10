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
              <option value="Arezzo">Arezzo</option>
              <option value="Caserta">Caserta</option>
              <option value="Chieti">Chieti</option>
              <option value="Firenze">Firenze</option>
              <option value="Frosinone">Frosinone</option>
              <option value="LAquila">L'Aquila</option>
              <option value="Latina">Latina</option>
              <option value="Napoli">Napoli</option>
              <option value="Perugia">Perugia</option>
              <option value="Rieti">Rieti</option>
              <option value="Roma">Roma</option>
              <option value="Sassari">Sassari</option>
              <option value="Terni">Terni</option>
              <option value="Trento">Trento</option>
              <option value="Viterbo">Viterbo</option>
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
                <option v-for="(city, index) in cities" :key="index" :value="city.Id">{{ city.Name }} </option>
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
                <option value=""> </option>
                <option v-for="(location, index) in locations" :key="index" :value="location.Id">{{ location.Name }} </option>
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
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Carica immagini</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control" type="file" multiple @change="onFileChanged">
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

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

        <div class="py-5">
          <div class="rounded border p-10">
            <div class="row justify-content-center">
              <div class="col-lg-4">
                <draggable :list="formData.Photos" :disabled="false" item-key="name" class="list-group"
                  ghost-class="ghost" @start="true" @end="false" :move="checkMove" :animation="300">
                  <template #item="{ element }">
                    <div class="card overlay">
                      <div class="card-body p-0">
                        <div class="overlay-wrapper">
                          <img :src="element.Url" alt="" class="w-100 card-rounded">
                        </div>
                        <div v-if="user.Id === formData.AgentId || user.Role === 'Admin' || formData.Agent.AgencyId === user.Id" class="overlay-layer card-rounded bg-dark bg-opacity-25">
                          <button v-if="!element.Highlighted" type="button" class="btn btn-primary btn-shadow"
                            @click="setPhotoHighlighted(element.Id)">Imposta immagine principale</button>
                          <button class="btn btn-light-danger btn-shadow ms-2" type="button"
                            @click="deleteFile(element.Id)">Elimina</button>
                        </div>
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>
              <!-- <div v-for="(photo, index) in formData.Photos" :key="index" class="col-lg-4"> -->
              <!--begin::Card-->
              <!-- <div class="card  overlay">
                  <div class="card-body p-0">
                    <div class="overlay-wrapper">
                      <img :src="photo.Url" alt="" class="w-100 card-rounded">
                    </div>
                    <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
                      <button v-if="!photo.Highlighted" type="button" class="btn btn-primary btn-shadow"
                        @click="setPhotoHighlighted(photo.Id)">Imposta immagine principale</button>
                      <button class="btn btn-light-danger btn-shadow ms-2" type="button"
                        @click="deleteFile(photo.Id)">Elimina</button>
                    </div>
                  </div>
                </div> -->
              <!--end::Card-->
              <!-- </div> -->

            </div>
          </div>
        </div>

      </div>
      <div v-if="user.Id === formData.AgentId || user.Role === 'Admin' || formData.Agent.AgencyId === user.Id"
        class="card-footer d-flex justify-content-between py-6 px-9">
        <div>
          <AddNewForm />
          <button type="button" class="btn btn-info btn-active-light-primary me-2" data-bs-toggle="modal"
            data-bs-target="#kt_modal_scheda">
            <KTIcon icon-name="file" icon-class="fs-2 me-1" />
            Scheda
          </button>
          <AddNewPreventive />
          <button type="button" class="btn btn-info btn-active-light-primary" data-bs-toggle="modal"
            data-bs-target="#kt_modal_preventivo">
            <KTIcon icon-name="calculator" icon-class="fs-2 me-1" />
            Preventivo
          </button>
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
  </div>
  <!--end::Content-->
</template>

<script lang="ts">
import AddNewForm from "@/components/modals/forms/AddNewForm.vue";
import AddNewPreventive from "@/components/modals/forms/AddNewPreventive.vue";
import { getAssetPath } from "@/core/helpers/assets";
import { provinceCities } from "@/core/data/provinces";
import { cityLocations } from "@/core/data/locations";
import { defineComponent, onMounted, ref, watch } from "vue";
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
  updatePhotosOrder
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
    const cities = ref([]);
    const locations = ref([]);
    const showTipologia = ref(false);
    const loading = ref<boolean>(true);
    const firtLoad = ref(false);
    const formData = ref<RealEstateProperty>({
      Title: "",
      ShortTitle: "",
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
      Location:"",
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
      ShortDescription: "",
      CustomerId: null,
      AgentId: "",
      AssignmentEnd: "",
      Agent: null,
      VideoUrl: "",
      AgreedCommission: 0,
      FlatRateCommission: 0,
      TypeOfAssignment: "",
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
      if (formData.value.State && provinceCities[formData.value.State]) {
        cities.value = provinceCities[formData.value.State];
      } else {
        cities.value = [];
      }
      if (formData.value.Town && cityLocations[formData.value.Town]) {
       locations.value = cityLocations[formData.value.Town];
       } else {
       locations.value = [];
      }
      setTimeout(() => firtLoad.value = false, 3000);
      loading.value = false;
      console.log(formData.value.Location)
    })

     watch(
    () => formData.value.State,
    (newProvince) => {
            if (newProvince && provinceCities[newProvince]) {
                cities.value = provinceCities[newProvince];
                formData.value.Town = formData.value.Town ??(cities.value[0]?.Id || null);
            } else {
                cities.value = [];
                formData.value.Town = null;
            }
       }
    );
    watch(
    () => formData.value.Town,
    (newTown) => {
            if (newTown && cityLocations[newTown]) {
                locations.value = cityLocations[newTown];
            } else {
                locations.value = [];
                formData.value.Location = null;
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

    return {
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
      cities,
      locations,
    };
  },
});
</script>