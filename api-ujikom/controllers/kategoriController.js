const db = require("../database/models");
const Kategori = db.Kategori;

// Menambah data
const store = async (req, res) => {
    try {
        const { nama, slug } = req.body;
        const save = await Kategori.create({ nama, slug });
        res.json({ status: 200, message: 'Success', data: save });
    } catch (error) {
        res.json({ status: 422, message: 'Error', error: error.message });
    }
}

// Menampilkan data kategori
const index = async (req, res) => {
    try {
        const result = await Kategori.findAll({ attributes: ['nama', 'slug'] });
        res.json({ status: 200, message: 'Success', data: result });
    } catch (error) {
        res.json({ status: 422, message: 'Error', error: error.message });
    }
}

// Menampilkan data kategori berdasarkan id
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Kategori.findByPk(id, { attributes: ['nama', 'slug'] });
        const result = data ? { status: 200, message: 'Success', data: data } : { status: 404, message: 'Not found' };
        res.json(result);
    } catch (error) {
        res.json({ status: 422, message: 'Error', error: error.message });
    }
}

// Mengupdate data kategori berdasarkan id
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const kategori = await Kategori.findByPk(id);
        if (kategori) {
            const { nama, slug } = req.body;
            await kategori.update({ nama, slug });
            res.json({ status: 200, message: 'Success updated' });
        } else {
            res.json({ status: 404, message: `${id} not found in db` });
        }
    } catch (error) {
        res.json({ status: 422, message: 'Error', error: error.message });
    }
}

// Menghapus data kategori berdasarkan id
const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const kategori = await Kategori.findByPk(id);
        if (kategori) {
            await kategori.destroy();
            res.json({ status: 200, message: 'Success deleted' });
        } else {
            res.json({ status: 404, message: `${id} not found in db` });
        }
    } catch (error) {
        res.json({ status: 422, message: 'Error', error: error.message });
    }
}

module.exports = {
    index, show, store,
    update, destroy
}