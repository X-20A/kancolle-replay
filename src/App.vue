<template>
	<div>
		<h1>Kancolle Sortie Simulator with Wasm</h1>
		<div v-if="is_loading">
			<p>WASM初期化中...</p>
		</div>
		<div v-else>
			<button style="border: 1px solid rgb(100, 108, 255)">sim 実行</button>
			<div v-if="sim_result">
				<h2>sim結果</h2>
				<pre>{{ sim_result }}</pre>
			</div>
		</div>
	</div>
	<router-view />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const sim_result = ref<string>('');
const is_loading = ref<boolean>(true);

onMounted(async () => {

});
</script>

<style scoped></style>
