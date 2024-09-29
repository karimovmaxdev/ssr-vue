import {defineStore} from "pinia";
import axios from 'axios';

export const useSearchStore = defineStore(
'searchStore',
{
    state: () => ({
        query: '',
        results: [] as Array<any>, // Массив результатов поиска
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async searchLocations() {
            if (this.query.trim() === '') {
                this.results = [];
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        q: this.query,
                        format: 'json',
                    },
                });
                this.results = response.data;
            } catch (err) {
                this.error = 'Error fetching data';
            } finally {
                this.loading = false;
            }
        },
    },
});
