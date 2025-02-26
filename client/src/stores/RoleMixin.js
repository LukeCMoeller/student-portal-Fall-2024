// mixins/adminMixin.js
import { computed } from 'vue';
import { useTokenStore } from '@/stores/TokenStore';
import { useReviewerStore } from '@/stores/ReviewerStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    // Stores
    const adminStore = useReviewerStore();
    const tokenStore = useTokenStore();

    // Store states
    const { IsAdminMode } = storeToRefs(adminStore);
    const IsAdmin = computed(() => tokenStore.get_admin);

    return {
      IsAdminMode,
      IsAdmin
    };
  },
};
