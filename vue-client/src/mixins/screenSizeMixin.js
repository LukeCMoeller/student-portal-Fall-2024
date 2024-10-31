export default {
    data() {
      return {
        isMobile: window.innerWidth < 1000,
      };
    },
    mounted() {
      window.addEventListener('resize', this.checkScreenWidth);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScreenWidth);
    },
    methods: {
      checkScreenWidth() {
        this.isMobile = window.innerWidth < 1000;
      }
    }
  };