<template>
    <div class="client-base-pagination-pages">
        <div class="label">Страница</div>
        <div class="pages">
            <div class="pages-item "  v-for="(page, index) in total" :key="index"
                :class="{ current: current == page }"
                @click="changePage(page)"
            >
                {{page}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        current: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
    },
    computed: {
      pages: function () {
        var pages = []

        for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
          pages.push(i)
        }

        return pages
      },
      rangeStart: function () {
        var start = this.current - this.pageRange

        return (start > 0) ? start : 1
      },
      rangeEnd: function () {
        var end = this.current + this.pageRange

        return (end < this.totalPages) ? end : this.totalPages
      },
      totalPages: function () {
        return Math.ceil(this.total)
      }
    },
    methods: {
      hasFirst: function () {
        return this.rangeStart !== 1
      },
      hasLast: function () {
        return this.rangeEnd < this.totalPages
      },
      hasPrev: function () {
        return this.current > 1
      },
      hasNext: function () {
        return this.current < this.totalPages
      },
      changePage: function (page) {
        this.$emit('page-changed', page)
      }
    }
}
</script>