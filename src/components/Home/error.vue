<template>
    <div>
        <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
            <div class="toast" style="position: absolute; top: 0; right: 0;">
                <div class="toast-header">
                <strong class="mr-auto">Bootstrap</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="false">&times;</span>
                </button>
                </div>
                <div class="toast-body">
                {{msg}}
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
export default {
    props:['msg'],
    data(){
        return {
            message:null
        }
    },
    destroyed(){
        this.message=null
    }
}

$(document).ready(function(){
    $(".toast").toast('hide');
});

</script>