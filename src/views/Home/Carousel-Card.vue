<!-- <template>
  <div class="banner">
    <div class="banner-container"></div>
    <div class="carousel-container">
      <div class="carousel" :style="carouselStyle">
        <div class="carousel-item" v-for="item in items" :key="item.id">
          <img :src="item.url" :alt="item.id" />
        </div>
      </div>
      <button class="prev" @click="prev">←</button>
      <button class="next" @click="next">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { homeBannerService } from '@/apis/home'
const items = ref([])
const currentIndex = ref(0)
const intervalId = ref(null)

const carouselStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 800}px)`,
    transition: 'transform 0.5s ease-in-out'
  }
})

function next() {
  currentIndex.value = (currentIndex.value + 1) % items.value.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + items.value.length) % items.value.length
}

function startAutoPlay() {
  intervalId.value = setInterval(next, 2000)
}

function stopAutoPlay() {
  clearInterval(intervalId.value)
}
const useBanner = async () => {
  const result = await homeBannerService()
  items.value = result.data
  console.log(result.data)
}

onMounted(() => {
  useBanner()
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.banner {
  display: flex;
}

.carousel-container {
  top: 50px;
  margin: 0 auto;
  position: relative;
  width: 800px;
  height: 400px;
  overflow: hidden;
  display: flex;
}

.carousel {
  display: flex;
}

.carousel-item {
  min-width: 800px;
  height: 400px;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

button.prev,
button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(187, 187, 187, 0.7);
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
}

button.prev {
  left: 10px;
}

button.next {
  right: 10px;
}
</style> -->

<template>
  <div class="banner" v-if="items.length">
    <div class="carousel-container">
      <div class="carousel" :style="carouselStyle">
        <div class="carousel-item" v-for="item in items" :key="item.id">
          <img :src="item.url" :alt="item.id" />
        </div>
      </div>
      <button class="prev" v-show="currentIndex > 0" @click="prev">←</button>
      <button class="next" v-show="currentIndex < items.length - 1" @click="next">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { homeBannerService } from '@/apis/home'
import { useIntersectionObserver } from '@vueuse/core'

const items = ref([])
const currentIndex = ref(0)
const intervalId = ref(null)
const carouselRef = ref(null)

const carouselStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 800}px)`,
    transition: 'transform 0.5s ease-in-out'
  }
})

function next() {
  currentIndex.value = (currentIndex.value + 1) % items.value.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + items.value.length) % items.value.length
}

function startAutoPlay() {
  intervalId.value = setInterval(next(), 1000)
}

function stopAutoPlay() {
  clearInterval(intervalId.value)
}

const useBanner = async () => {
  try {
    const result = await homeBannerService()
    items.value = result.data
  } catch (error) {
    console.error('Failed to fetch banner data:', error)
  }
}

onMounted(() => {
  useBanner()
  useIntersectionObserver(
    carouselRef,
    ([entry]) => {
      if (entry.isIntersecting) {
        startAutoPlay()
      } else {
        stopAutoPlay()
      }
    },
    { rootMargin: '0px' }
  )
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.banner {
  display: flex;
}

.carousel-container {
  top: 50px;
  margin: 0 auto;
  position: relative;
  width: 800px;
  height: 400px;
  overflow: hidden;
  display: flex;
}

.carousel {
  display: flex;
}

.carousel-item {
  min-width: 800px;
  height: 400px;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

button.prev,
button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(187, 187, 187, 0.7);
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
}

button.prev {
  left: 10px;
}

button.next {
  right: 10px;
}
</style>
