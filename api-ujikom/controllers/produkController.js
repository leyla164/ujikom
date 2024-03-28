// Komentar Tambahan:

// Import library yang dibutuhkan
const db = require("../database/models");
const Produk = db.Produk;
const Kategori = db.Kategori;
const slugify = require('slugify');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Menambahkan library fs untuk menghapus file

// Set storage engine untuk multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/produk'); // Menyimpan file di folder public/uploads/produk
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// Function untuk mengecek tipe file yang diupload
function checkFileType(file, cb) {
    // Ekstensi file yang diizinkan
    const filetypes = /jpeg|jpg|png|gif/;
    // Mengecek ekstensi file
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Mengecek tipe mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only images are allowed (jpeg, jpg, png, gif)!');
    }
}

// Schema validasi Joi untuk data produk
const produkSchema = Joi.object({
    nama_produk: Joi.string().required(),
    harga: Joi.number().required(),
    deskripsi: Joi.string().required(),
    stok: Joi.number().required(),
    id_kategori: Joi.number().required(),
});

// Middleware multer untuk upload file
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('foto');

// Method untuk menyimpan data produk ke database
const store = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(422).json({ status: 422, message: err });
            }

            // Validasi data produk menggunakan Joi, dengan mengesampingkan validasi foto
            const { error } = produkSchema.validate(req.body, { exclude: ['foto'] });
            if (error) {
                return res.status(422).json({ status: 422, message: error.details[0].message });
            }

            if (!req.file) {
                return res.status(422).json({ status: 422, message: 'No file uploaded' });
            }

            // Menyimpan path foto yang akan disimpan di database
            const foto = req.file.path.replace('public', '');

            const { nama_produk, harga, deskripsi, stok, id_kategori } = req.body;
            const slug = slugify(nama_produk, { lower: true });

            // Menyimpan data produk ke database
            const save = await Produk.create({ nama_produk, slug, harga, deskripsi, foto, stok, id_kategori });
            res.json({ status: 200, message: 'success', data: save });
        });
    } catch (error) {
        res.json({ status: 422, message: error.message });
    }
};

// Method untuk menampilkan semua data produk
const index = async (req, res) => {
    try {
        const result = await Produk.findAll({ include: Kategori });
        res.json({ status: 200, message: "success", data: result });
    } catch (error) {
        res.json({ status: 422, message: error.message });
    }
}

// Method untuk menampilkan detail data produk berdasarkan ID
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Produk.findByPk(id, { include: Kategori });
        const result = data ? data : `${id} not found in db`;
        res.json({ status: 200, message: "success", data: result });
    } catch (error) {
        res.json({ status: 422, message: error.message });
    }
}

// Method untuk mengupdate data produk berdasarkan ID
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const produk = await Produk.findByPk(id);

        if (!produk) {
            return res.json({ status: 422, message: `${id} not found in db` });
        }

        upload(req, res, async function (err) {
            if (err) {
                return res.status(422).json({ status: 422, message: err });
            }

            // Validasi data produk menggunakan Joi, dengan mengesampingkan validasi foto
            const { error } = produkSchema.validate(req.body, { exclude: ['foto'] });
            if (error) {
                return res.status(422).json({ status: 422, message: error.details[0].message });
            }

            let foto = produk.foto; // Tetap menggunakan foto lama jika tidak ada file baru diunggah

            if (req.file) {
                // Hapus foto lama jika ada file baru diunggah
                await fs.unlink(`public${produk.foto}`);
                foto = req.file.path.replace('public', '');
            }

            const { nama_produk, harga, deskripsi, stok, id_kategori } = req.body;
            const slug = slugify(nama_produk, { lower: true });

            // Update data produk di database
            await produk.update({ nama_produk, slug, harga, deskripsi, foto, stok, id_kategori });
            res.json({ status: 200, message: 'success updated' });
        });
    } catch (error) {
        res.json({ status: 422, message: error.message });
    }
};

// Method untuk menghapus data produk berdasarkan ID
const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const produk = await Produk.findByPk(id);
        if (produk) {
            await produk.destroy();
            res.json({ status: 200, message: "success deleted" });
        } else {
            res.json({ status: 422, message: `${id} not found in db` });
        }
    } catch (error) {
        res.json({ status: 422, message: error.message });
    }
}

module.exports = {
    index, show, store,
    update, destroy
}