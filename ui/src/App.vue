<template>
  <div>
    <h1>Kancolle Sortie Simulator with Wasm</h1>
    <div v-if="is_loading">
      <p>WASM初期化中...</p>
    </div>
    <div v-else>
      <button @click="runSim">sim 実行</button>
      <div v-if="sim_result">
        <h2>sim結果</h2>
        <pre>{{ sim_result }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// wasm-bindgenで生成されたkssw_bg.jsをimportし、初期化関数(init)を利用する
import { onMounted, ref } from 'vue';
import init, { sim } from './wasm/kssw';

const sim_result = ref<string>('');
const is_loading = ref<boolean>(true);

/**
 * sim関数を実行し、結果を表示する。
 * WASM初期化はonMountedで明示的に行う。
 * @returns {void}
 */
function runSim(): void {
  try {
    sim_result.value = sim();
  } catch (error) {
    sim_result.value = `sim実行時エラー: ${String(error)}`;
  }
}

onMounted(async () => {
	init().then(() => {
		is_loading.value = false;
	});
});
</script>

<style scoped>

</style>
