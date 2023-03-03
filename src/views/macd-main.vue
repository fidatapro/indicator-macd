<template>
  <v-data-table
    :headers="headers"
    :items="data_table"
    sort-by="calories"
    class="custom_table_class"
    :options.sync="pagination"
    @update:page="updatePage()"
    :footer-props="footerProps"
    :loading="loading"
  >
    <template v-slot:[`item.icon`]="{ item }">
      <v-btn depressed @click="addFavorite(item)">
        <div class="d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
            class="v-icon__svg"
            :class="{ 'color-favorite': checkFavorite(item) }"
          >
            <path
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
            ></path>
          </svg>
        </div>
      </v-btn>
    </template>
    <template v-slot:top>
      <v-toolbar flat class="py-2">
        <v-toolbar-title>Macd table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div style="width: 400px" class="d-flex align-center flex-grow-0">
          <v-text-field
            label="Search ..."
            append-icon="mdi-magnify"
            hide-details
            style="width: 50px !important"
            v-model="form.search"
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          @click="clickFavorite()"
          :color="check_favorite ? 'primary' : 'default'"
        >
          <div class="d-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="v-icon__svg"
            >
              <path
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
              ></path>
            </svg>
            <div class="mt-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                class="v-icon__svg"
                style="font-size: 14px; height: 14px; width: 14px"
              >
                <path
                  d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                ></path>
              </svg>
            </div>
          </div>
        </v-btn>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.coin_name="{ item }">
      <img
        style="width: 30px; padding-right: 8px; vertical-align: middle"
        :src="getSrc(item.coin_symbol)"
      />
      {{ item.coin_name }}
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.coin_price="{ item }">
      <div
        :class="getStatus(item.status, item.id)"
        class="pa-2 d-flex flex-wrap flex-grow-1"
      >
        <span>
          {{ `$${flooNumber(item.coin_price)}`  }}
        </span>
      </div>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:[`item.macd_hist_5min`]="{ item }">
      <span :class="getColorMACD(item.macd_hist_5min)">
        {{ item.macd_hist_5min }}
      </span>
    </template>
    <template v-slot:[`item.macd_hist_15min`]="{ item }">
      <span :class="getColorMACD(item.macd_hist_15min)">
        {{ item.macd_hist_15min }}
      </span>
    </template>
    <template v-slot:[`item.macd_hist_30min`]="{ item }">
      <span :class="getColorMACD(item.macd_hist_30min)">
        {{ item.macd_hist_30min }}
      </span>
    </template>
    <template v-slot:[`item.macd_hist_1h`]="{ item }">
      <span :class="getColorMACD(item.macd_hist_1h)">
        {{ item.macd_hist_1h }}
      </span>
    </template>
    <template v-slot:[`item.macd_hist_2h`]="{ item }">
      <span :class="getColorMACD(item.macd_hist_2h)">
        {{ item.macd_hist_2h }}
      </span>
    </template>
    <template v-slot:[`item.macd_hist_4h`]="{ item }">
      <span :class="getColorMACD(item.macd_hist_4h)">
        {{ item.macd_hist_4h }}
      </span>
    </template>
    <template v-slot:[`item.macd_hist_24h`]="{ item }">
      <span :class="getColorMACD(item.macd_hist_24h)">
        {{ item.macd_hist_24h }}
      </span>
    </template>

    <template v-slot:[`item.bollinger_bands_5min`]="{ item }">
      <span :class="getColorBB(item.bollinger_bands_5min)">
        {{ item.bollinger_bands_5min }}
      </span>
    </template>
    <template v-slot:[`item.bollinger_bands_15min`]="{ item }">
      <span :class="getColorBB(item.bollinger_bands_15min)">
        {{ item.bollinger_bands_15min }}
      </span>
    </template>

    <!-- eslint-disable-next-line -->
    <template v-slot:item.bollinger_bands_30min="{ item }">
      <span :class="getColorBB(item.bollinger_bands_30min)">
        {{ item.bollinger_bands_30min }}
      </span>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.bollinger_bands_1h="{ item }">
      <span :class="getColorBB(item.bollinger_bands_1h)">
        {{ item.bollinger_bands_1h }}
      </span>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.bollinger_bands_2h="{ item }">
      <span :class="getColorBB(item.bollinger_bands_2h)">
        {{ item.bollinger_bands_2h }}
      </span>
    </template>
  </v-data-table>
</template>
<script>
import {
  getData,
  getStatus,
  getSrc,
  getMACD,
  getColorMACD,
  getBB,
  getColorBB,
  flooNumber,
  debounce,
} from "@/views/function";
import JsonSearch from "search-array";
export default {
  data: () => ({
    getStatus,
    getSrc,
    getMACD,
    getColorMACD,
    getBB,
    getColorBB,
    flooNumber,
    headers: [
      {
        text: "",
        align: "start",
        sortable: false,
        value: "icon",
      },
      {
        text: "1-500",
        align: "center",
        sortable: false,
        value: "rank",
        width: "70px"
      },
      { text: "NAME", width: "250px", value: "coin_name", align: "start" },
      { text: "PRICE", value: "coin_price", align: "center", width: "auto" },
      { text: "MACD5M", value: "macd_hist_5min", align: "end" ,width: "auto" },
      { text: "MACD15M", value: "macd_hist_15min", align: "end" },
      { text: "MACD30M", value: "macd_hist_30min", align: "end" },
      { text: "MACD1H", value: "macd_hist_1h", align: "end" },
      { text: "MACD2H", value: "macd_hist_2h", align: "end" },
      { text: "MACD4H", value: "macd_hist_4h", align: "end" },
      { text: "MACD24H", value: "macd_hist_24h", align: "end" },

      {
        text: "BB5M",
        value: "bollinger_bands_5min",
        align: "end",
      },
      { text: "BB15M", value: "bollinger_bands_15min", align: "end" },
      { text: "BB30M", value: "bollinger_bands_30min", align: "end" },
      { text: "BB1H", value: "bollinger_bands_1h", align: "end" },
      { text: "BB2H", value: "bollinger_bands_2h", align: "end" },
    ],
    pagination: {
      page: 1,
      perpage: 25,
    },
    data_table: [],
    data: [],
    loading: true,
    footerProps: {
      showFirstLastPage: true,
      showCurrentPage: true,
      itemsPerPageOptions: [25, 35, 50, -1],
    },
    form: {
      search: null,
    },
    check_favorite: false,
  }),
  watch: {
    "form.search": {
      handler: debounce(function (value) {
        this.handleSearch(value);
      }, 500),
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.loading = true;
      const coin_data = await getData();
      this.data = coin_data.map((x) => ({
        rank: x.rank,
        coin_symbol: x.coin_symbol,
        coin_name: x.coin_name,
        coin_price: x.coin_price,
        macd_hist_5min: this.getMACD(x.macd_hist_5min),
        macd_hist_15min: this.getMACD(x.macd_hist_15min),
        macd_hist_30min: this.getMACD(x.macd_hist_30min),
        macd_hist_1h: this.getMACD(x.macd_hist_1h),
        macd_hist_2h: this.getMACD(x.macd_hist_2h),
        macd_hist_4h: this.getMACD(x.macd_hist_4h),
        macd_hist_24h: this.getMACD(x.macd_hist_24h),
        // BB
        bollinger_bands_5min: getBB(
          x.coin_price,
          x.bollinger_bands_upper_5min,
          x.bollinger_bands_lower_5min
        ),
        bollinger_bands_15min: getBB(
          x.coin_price,
          x.bollinger_bands_upper_15min,
          x.bollinger_bands_lower_15min
        ),
        bollinger_bands_30min: getBB(
          x.coin_price,
          x.bollinger_bands_upper_30min,
          x.bollinger_bands_lower_30min
        ),
        bollinger_bands_1h: getBB(
          x.coin_price,
          x.bollinger_bands_upper_1h,
          x.bollinger_bands_lower_1h
        ),
        bollinger_bands_2h: getBB(
          x.coin_price,
          x.bollinger_bands_upper_2h,
          x.bollinger_bands_lower_2h
        ),
      }));
      this.data_table = this.data;

      this.loading = false;
      setTimeout(() => this.initialize(), 5 * 60 * 1000);
    },
    async updatePage() {},
    addFavorite({ coin_name }) {
      const list_coin = localStorage.getItem("COIN_FAVORITE");
      if (!list_coin) {
        localStorage.setItem("COIN_FAVORITE", JSON.stringify([coin_name]));
      } else {
        let arr = JSON.parse(list_coin);
        if (arr.includes(coin_name)) {
          arr = arr.filter((x) => x != coin_name);
        } else {
          arr.unshift(coin_name);
        }
        localStorage.setItem("COIN_FAVORITE", JSON.stringify(arr));
      }
      this.initialize();
    },
    handleSearch(text) {
      const searcher = new JsonSearch(this.data);
      this.data_table = searcher.query(text.trim());
    },
    checkFavorite({ coin_name }) {
      const list_coin = localStorage.getItem("COIN_FAVORITE");
      if (!list_coin) return false;
      return JSON.parse(list_coin).includes(coin_name);
    },
    clickFavorite() {
      this.check_favorite = !this.check_favorite;
      if(this.check_favorite){
        const check_list_coin = localStorage.getItem("COIN_FAVORITE");
        if (!check_list_coin) return;
        const list_coin = JSON.parse(check_list_coin);
        this.data_table = this.data.filter((x) =>
          list_coin.includes(x.coin_name)
        );
      }else{
        this.data_table = this.data
      }
    },
  },
};
</script>
<style>
@keyframes price-change {
  from {
    background-color: #4caf50;
  }
  to {
    background-color: black;
  }
}
.changed {
  animation-name: price-change;
  animation-duration: 2s;
}
.normal {
  color: white;
}
.color-red {
  color: #f44336;
}
.color-green {
  color: #4caf50;
}
.color-orange {
  color: #ff9800;
}
.color-favorite {
  color: #ff9800;
}
</style>
