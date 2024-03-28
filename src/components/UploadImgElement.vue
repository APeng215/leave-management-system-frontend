<template>
    <div>
        <button type="button" class="btn btn-danger btn-lg shadow" @click="$bvModal.show('uploadImgModal')">
            更新头像 <i class="bi bi-pencil-square"></i>
        </button>
        <b-modal id="uploadImgModal" cancel-title="取消" ok-title="确定更新" title="更新头像" @ok="uploadImg" centered>
            <input class="form-control" type="file" id="file" ref="imgInput" name="file">
        </b-modal>
    </div>
</template>
 
<script>
import FetchHelper from '../js/util/FetchHelper';

export default {
    name: 'imageUpload',
    data() {
        return {
            previewImage: null
        }
    },
    methods: {
        uploadImg() {
            FetchHelper.uploadImg(this.$refs.imgInput);
            setTimeout(()=>this.$emit("imgUpdated"), 500);
            
        }
    }
}  // missing closure added
</script>
 
 
 
<style>
.uploading-image {
    display: flex;
}
</style>