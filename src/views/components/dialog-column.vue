<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent width="1024">
      <v-card class="pa-2">
        <v-card-text>
          <div class="d-flex align-center">
            <div style="font-size: 20px">
              Customize the fields {{ typeColumn }} you want displayed
            </div>
            <v-btn class="ml-auto" icon @click="show = false">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </div>
          <div class="mt-2" v-if="list_column_show.length">
            <v-chip
              v-for="(item, index) in list_column_show"
              :key="`chip_${index}`"
              color="primary"
              class="ma-2"
              close
              @click:close="clearColumn(item)"
            >
              {{ item.text || null }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="resetToDefault()">
            Reset to default
          </v-btn>
          <v-btn color="blue-darken-1" text @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    typeColumn: {
      type: String,
      default: null,
    },
    listFields: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    show: false,
    list_column_show: [],
  }),
  methods: {
    open() {
      this.show = true;
    },
    setLisColumnShow() {
      const ema_colum = localStorage.getItem("MACD_COLUMN");
      if (!ema_colum) {
        this.list_column_show = this.listFields;
      } else {
        return (this.list_column_show = JSON.parse(ema_colum));
      }
    },
    clearColumn({ value }) {
      this.list_column_show = this.list_column_show.filter((x) => {
        return x.value != value;
      });
    },
    resetToDefault() {
      this.list_column_show = this.listFields;
    },
    save() {
      localStorage.setItem("MACD_COLUMN", JSON.stringify(this.list_column_show));
      this.setCoumnShow();
    },
    setCoumnShow() {
      this.$emit("reset");
      this.show = false;
    },
  },
};
</script>
