<template>
    <div>
        <div class="mb-4">
            <label for="">Jenis Bantuan</label>
            <select @change="$emit('selectedBantuan', $event.target.value)" class="block appearance-none w-full py-1 px-2 mb-1 text-base 
                leading-normal bg-white text-gray-800 border border-gray-200 rounded">
                <option value="">Pilih Bantuan</option>
                <option v-for="row in listBantuan" :key="row.name" :value="row.name">
                    {{ row.name }}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        listBantuan() {
            return this.$store.state.clients.listBantuan
        }
    }
}
</script>