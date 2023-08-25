<template>
    <div class="pagination">
           <button :disabled="pageNo===1" @click="$emit('getpageno',pageNo-1)">上一页</button>
        <button v-if="StartandEnd.start>1" :class="{active:pageNo==1}">1</button>
     
        <button v-if="StartandEnd.start > 2">···</button>

        <button v-for="(pages,index) in StartandEnd.end" :key="index"  
        v-show="pages >= StartandEnd.start" 
        @click="$emit('getpageno',pages)"
        :class="{active:pageNo===pages}">{{ pages }}</button>

        <button v-if="StartandEnd.end<totalpage-1">···</button>
        <button  v-if="StartandEnd.end < totalpage" @click="$emit('getpageno', totalpage)" :class="{active:pageNo===totalpage}">{{ totalpage }}</button>
        <button :disabled="pageNo===totalpage" @click="$emit('getpageno', pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        totalpage() { 
            return Math.ceil(this.total/this.pageSize)
        },
        StartandEnd() { 
            const { pageNo, totalpage, continues}=this
            let start = 0
            let end = 0
            if (continues >totalpage) {
                start = 1
                end = totalpage
            } else { 
                start = pageNo - Math.floor(continues / 2)
                end = pageNo + Math.floor(continues / 2)
                if (start < 1) { 
                    start = 1
                    end=continues
                }
                 if (end>totalpage) {
                    end=totalpage
                    start =totalpage- continues+1
                }
            }
            return {start,end}
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
.active{
    background-color: skyblue;
}
</style>
