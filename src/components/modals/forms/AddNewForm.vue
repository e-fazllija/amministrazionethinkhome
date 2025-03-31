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
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="riconoscimento-presente">
                <label class="form-check-label" for="riconoscimento-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="riconoscimento-richiedere">
                <label class="form-check-label" for="riconoscimento-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Codice Fiscale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Codice Fiscale o Tessera Sanitaria</h4>
            <p class="text-muted fs-6 mb-3">(se persona giuridica del legale rappresentante o del titolare)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="cfiscale-presente">
                <label class="form-check-label" for="cfiscale-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="cfiscale-richiedere">
                <label class="form-check-label" for="cfiscale-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Estratto atto matrimonio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Estratto per riassunto dell'atto di matrimonio</h4>
            <p class="text-muted fs-6 mb-3">(con indicato il regime coniugale e patrimoniale o Certificato di stato libero o Certificato di unione civile)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="matrimonio-presente">
                <label class="form-check-label" for="matrimonio-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="matrimonio-richiedere">
                <label class="form-check-label" for="matrimonio-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Atto di provenienza -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto/i di provenienza</h4>
            <p class="text-muted fs-6 mb-3">(Acquisto, Successione + Accettazione eredità, Divisione, Donazione, Permuta, Decreto di Trasferimento, Sentenza, Usucapione, etc.)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="provenienza-presente">
                <label class="form-check-label" for="provenienza-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="provenienza-richiedere">
                <label class="form-check-label" for="provenienza-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Impianti -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Impianti: dichiarazione di conformità o di rispondenza</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elettrico/elettronico</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="impianto-elettrico-presente">
                  <label class="form-check-label" for="impianto-elettrico-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="impianto-elettrico-richiedere">
                  <label class="form-check-label" for="impianto-elettrico-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- idrico/sanitario</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="impianto-idrico-presente">
                  <label class="form-check-label" for="impianto-idrico-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="impianto-idrico-richiedere">
                  <label class="form-check-label" for="impianto-idrico-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- gas</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="impianto-gas-presente">
                  <label class="form-check-label" for="impianto-gas-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="impianto-gas-richiedere">
                  <label class="form-check-label" for="impianto-gas-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- riscaldamento/condizionamento</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="impianto-riscaldamento-presente">
                  <label class="form-check-label" for="impianto-riscaldamento-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="impianto-riscaldamento-richiedere">
                  <label class="form-check-label" for="impianto-riscaldamento-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- sollevamento</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="impianto-sollevamento-presente">
                  <label class="form-check-label" for="impianto-sollevamento-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="impianto-sollevamento-richiedere">
                  <label class="form-check-label" for="impianto-sollevamento-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- antincendio</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="impianto-antincendio-presente">
                  <label class="form-check-label" for="impianto-antincendio-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="impianto-antincendio-richiedere">
                  <label class="form-check-label" for="impianto-antincendio-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>
          </div>
          <!-- Libretto caldaia -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Libretto della caldaia</h4>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="caldaia-presente">
                <label class="form-check-label" for="caldaia-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="caldaia-richiedere">
                <label class="form-check-label" for="caldaia-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Abitabilità/Agibilità -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Abitabilità / Agibilità</h4>
            <p class="text-muted fs-6 mb-3">(Certificato rilasciato dal Comune o Attestazione redatta dal Tecnico)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="abitabilita-presente">
                <label class="form-check-label" for="abitabilita-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="abitabilita-richiedere">
                <label class="form-check-label" for="abitabilita-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Certificato idoneità statica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di idoneità statica</h4>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="statica-presente">
                <label class="form-check-label" for="statica-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="statica-richiedere">
                <label class="form-check-label" for="statica-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Relazione Tecnica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Relazione Tecnica Integrata di Conformità Edilizia e Catastale</h4>
            <p class="text-muted fs-6 mb-3">(comprenderà dati catastali completi, descrizione, titolarità, situazione edilizia con riepilogo dei titoli abilitanti, informazioni sull'agibilità/abitabilità, conformità edilizia e catastale, informazioni circa l'esistenza di un interesse culturale del bene ai sensi del D. Lgs. 42/04 ed attestazione conclusiva. Saranno allegati visura catastale e planimetria catastale)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="relazione-tecnica-presente">
                <label class="form-check-label" for="relazione-tecnica-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="relazione-tecnica-richiedere">
                <label class="form-check-label" for="relazione-tecnica-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Catasto -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Catasto:</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- visura e planimetria</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="catasto-visura-presente">
                  <label class="form-check-label" for="catasto-visura-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="catasto-visura-richiedere">
                  <label class="form-check-label" for="catasto-visura-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- estratto di mappa</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="catasto-mappa-presente">
                  <label class="form-check-label" for="catasto-mappa-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="catasto-mappa-richiedere">
                  <label class="form-check-label" for="catasto-mappa-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elaborato planimetrico con elenco subalterni</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="catasto-planimetrico-presente">
                  <label class="form-check-label" for="catasto-planimetrico-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="catasto-planimetrico-richiedere">
                  <label class="form-check-label" for="catasto-planimetrico-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>
          </div>
          <!-- APE -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Attestato di Certificazione/Prestazione Energetica (laddove previsto per legge)</h4>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="ape-presente">
                <label class="form-check-label" for="ape-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="ape-richiedere">
                <label class="form-check-label" for="ape-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Visura ipocatastale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura ipocatastale</h4>
            <p class="text-muted fs-6 mb-3">(a verifica della titolarità immobiliare ed eventuali gravami)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="visura-ipocatastale-presente">
                <label class="form-check-label" for="visura-ipocatastale-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="visura-ipocatastale-richiedere">
                <label class="form-check-label" for="visura-ipocatastale-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Condominio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Condominio (indicare recapiti dell'amministratore):</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- regolamento</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="condominio-regolamento-presente">
                  <label class="form-check-label" for="condominio-regolamento-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="condominio-regolamento-richiedere">
                  <label class="form-check-label" for="condominio-regolamento-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- tabelle millesimali</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="condominio-millesimali-presente">
                  <label class="form-check-label" for="condominio-millesimali-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="condominio-millesimali-richiedere">
                  <label class="form-check-label" for="condominio-millesimali-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimo bilancio consuntivo e preventivo</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="condominio-bilancio-presente">
                  <label class="form-check-label" for="condominio-bilancio-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="condominio-bilancio-richiedere">
                  <label class="form-check-label" for="condominio-bilancio-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimi due verbali dell'assemblea condominiale</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="condominio-verbali-presente">
                  <label class="form-check-label" for="condominio-verbali-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="condominio-verbali-richiedere">
                  <label class="form-check-label" for="condominio-verbali-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- dichiarazione scritta e firmata dall'amministratore attestante l'avvenuto pagamento di tutte le spese condominiali e indicazione delle eventuali spese straordinarie deliberate e delle liti in corso</h5>
              <div class="d-flex">
                <div class="form-check form-check-custom form-check-solid me-10">
                  <input class="form-check-input" type="checkbox" id="condominio-dichiarazione-presente">
                  <label class="form-check-label" for="condominio-dichiarazione-presente">Presente</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" id="condominio-dichiarazione-richiedere">
                  <label class="form-check-label" for="condominio-dichiarazione-richiedere">Da richiedere</label>
                </div>
              </div>
            </div>
          </div>
          <!-- Visura camerale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura camerale</h4>
            <p class="text-muted fs-6 mb-3">(solo se persona giuridica)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="visura-camerale-presente">
                <label class="form-check-label" for="visura-camerale-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="visura-camerale-richiedere">
                <label class="form-check-label" for="visura-camerale-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Procura -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Procura speciale o generale</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di procuratore)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="procura-presente">
                <label class="form-check-label" for="procura-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="procura-richiedere">
                <label class="form-check-label" for="procura-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Certificato Urbanistico -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di Destinazione Urbanistica</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di terreni)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="urbanistica-presente">
                <label class="form-check-label" for="urbanistica-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="urbanistica-richiedere">
                <label class="form-check-label" for="urbanistica-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Contratto locazione -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Copia del contratto di locazione</h4>
            <p class="text-muted fs-6 mb-3">(solo nell'ipotesi di immobile locato)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="locazione-presente">
                <label class="form-check-label" for="locazione-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="locazione-richiedere">
                <label class="form-check-label" for="locazione-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Mutuo -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Ricevuta di pagamento ultima rata del mutuo con indicazione del capitale residuo</h4>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="mutuo-presente">
                <label class="form-check-label" for="mutuo-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="mutuo-richiedere">
                <label class="form-check-label" for="mutuo-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
          <!-- Detrazioni fiscali -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documentazione inerente la detrazione fiscale ancora in godimento e da trasferire</h4>
            <p class="text-muted fs-6 mb-3">(per lavori eseguiti sull'immobile e/o su parti comuni)</p>
            <div class="d-flex">
              <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="checkbox" id="detrazioni-presente">
                <label class="form-check-label" for="detrazioni-presente">Presente</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" id="detrazioni-richiedere">
                <label class="form-check-label" for="detrazioni-richiedere">Da richiedere</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <div class="modal-footer">
        <button 
            type="button" 
            class="btn btn-secondary me-auto"
            @click="printWithBrowser">
            <i class="fas fa-print me-2"></i> Stampa
          </button>
        <button type="button" class="btn btn-light me-3" data-bs-dismiss="modal">
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
export default {
  methods: {
    printWithBrowser() {
  // 1. Ottieni il contenuto della modale
  const modalContent = document.getElementById("kt_modal_scheda");
  if (!modalContent) return;

  // 2. Clona solo il contenuto necessario
  const printContent = modalContent.cloneNode(true) as HTMLElement;
  
  // 3. Rimuovi elementi non necessari
  const footer = printContent.querySelector('.modal-footer');
  if (footer) footer.remove();

  // 4. Prepara l'HTML per la stampa
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
            font-family: Arial;
            margin: 0;
            padding: 15mm;
            color: #000;
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
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `;

  // 5. Apri la finestra di stampa
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Per favore abilita i popup per la stampa");
    return;
  }

  // 6. Scrivi il contenuto e chiudi il documento
  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();

  // 7. Avvia la stampa dopo un breve ritardo
  setTimeout(() => {
    printWindow.print();
  }, 300);
}
  }
}
</script>

<style scoped>
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
}
</style>