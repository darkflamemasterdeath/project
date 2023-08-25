<template>
  <div>
    <div class="card-header"><span>{{ title }}</span>
    <svg t="1691315009866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2825" width="30" height="30"><path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="2826"></path><path d="M480 736a32 32 0 1 0 64 0h-64z m64-256a32 32 0 1 0-64 0h64z m-64-128a32 32 0 1 0 64 0h-64z m64-64a32 32 0 1 0-64 0h64z m352 224c0 212.064-171.936 384-384 384v64c247.424 0 448-200.576 448-448h-64zM512 896C299.936 896 128 724.064 128 512H64c0 247.424 200.576 448 448 448v-64zM128 512C128 299.936 299.936 128 512 128V64C264.576 64 64 264.576 64 512h64zM512 128c212.064 0 384 171.936 384 384h64c0-247.424-200.576-448-448-448v64z m32 608v-256h-64v256h64z m0-384V288h-64v64h64z" fill="#000000" p-id="2827"></path></svg>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
      <slot name='charts'></slot>
    </div>
    <div class="card-footer">
<slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: ['title','count']
}
</script>

<style scoped>
.card-header{
    display: flex;
    justify-content: space-between;
    color:#d9d9d9
}
.card-content{
    font-size:30px;
    padding: 10px 0;
}
.card-charts{
    height: 50px;
}
.card-footer{
    border-top: 1px solid #eee;
    padding-top:10px
}
</style>