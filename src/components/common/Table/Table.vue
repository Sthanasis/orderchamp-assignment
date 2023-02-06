<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="c in tableColumns"
          :key="c"
        >
          <slot
            name="table-columns"
            v-bind="{ column: c }"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(data, index) in tableData"
        :key="data.id"
      >
        <slot
          name="table-rows"
          v-bind="{ data, isLast: tableData.length === index + 1 }"
        />
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts" setup>
import type { VariantType } from '~/types';

interface IProps {
  tableData: Array<VariantType>;
  tableColumns: string[];
}

defineProps<IProps>();
</script>
