<template>
    <div>
        <div class="mb-4">
            <label for="">Donatur</label>
            <select @change="$emit('selectedDonatur', $event.target.value)"
                class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
                <option value="">Pilih Donatur</option>
                <option v-for="donatur in listDonatur" :key="donatur.name" :value="donatur.name">
                    {{ donatur.name }}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        listDonatur() {
            return this.$store.state.donatur.listDonatur
        }
    }
}
</script>