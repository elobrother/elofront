<template>
    <div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-backdrop="static">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-top mt-5">
                <img src="@/assets/logo2.png" alt="" height="60" class="center">
              </div>
              <div class="modal-body text-justify text-modal-detail bold">
                    <p>
                      A ELOBROTHER não possui qualquer vínculo ou associação com a Riot Games e seu site, seus produtos e afins.
                    </p>
                    <p>
                      Somos uma organização 100% independente, ao clicar em concordar você automaticamente concordará que está ciente desta informação.
                    </p>
              </div>
              <div class="modal-footer">
                <div id="button-block">
                  <button
                    type="button"
                    class="btn btn-secondary btn-lg"
                    onclick="window.location.href='http://www.google.com'">
                    Discordo, desejo sair</button>
                  <button 
                    type="button" 
                    class="btn btn-primary btn-lg"
                    data-dismiss="modal">Concordo, desejo entrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    $(window).on('load',function(){
        $('#myModal').modal('show');
    });
</script>


<style>
  #button-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  #button-block button {
    margin: 0px 10px;
    width: 45%;
  }
</style>