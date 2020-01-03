<template>
    <div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-backdrop="static">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-top mt-5">
                <img src="@/assets/logo2.png" alt="" height="60" class="center">
              </div>
              <div class="modal-body text-justify text-modal-detail">
                    <h5>A EloBrother não possui qualquer vínculo ou associação com a Riot Games e seu site, produtos e afins.</h5>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-lg btn-block" data-dismiss="modal">OK, estou ciente e concordo</button>
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