<template>
  <div class="button">
    <button type="button" class="btn" @click="$emit('click')">
      <slot />
    </button>
  </div>
</template>

<style>
.btn {
  padding: 0.4rem 0.7rem;
  border: none;
  border-radius: 0.3rem;
  background: rgb(8, 65, 255);
  color: #fff;
  cursor: pointer;
}
</style>
