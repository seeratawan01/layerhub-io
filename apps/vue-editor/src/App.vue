<script setup lang="ts">
import { initStore } from "@postnitro-sdk/vue"
import Editor from "./Editor.vue"
initStore()
</script>

<template>
  <Editor />
</template>

<style>
body {
  margin: 0;
}
</style>
