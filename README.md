# UI-website kali

## 🎯 Fitur Utama:
---
## 1. Dashboard

- Ringkasan keuangan (pendapatan, pengeluaran, keuntungan bersih)
- Statistik produk dan penjualan
- Alert produk stok menipis
- Penjualan terbaru

## 2. Manajemen Produk

- Tambah, edit, hapus produk
- Kategorisasi produk
- Tracking stok dan minimum stok
- Perhitungan margin keuntungan per produk

## 3. Manajemen Penjualan

- Catat penjualan dengan otomatis mengurangi stok
- Riwayat transaksi penjualan
- Data pelanggan (opsional)

## 4. Manajemen Pengeluaran

- Catat semua pengeluaran bisnis
- Kategorisasi pengeluaran
- Tracking total pengeluaran

## 5. Laporan & Analisis

- Laporan keuangan komprehensif
- Analisis performa produk
- Breakdown pengeluaran per kategori
- Filter berdasarkan periode (hari ini, 7 hari, 30 hari, semua)

## 6. Kalkulator Bisnis

- Kalkulator keuntungan (hitung profit dari harga beli/jual)
- Kalkulator margin (tentukan harga jual berdasarkan target margin)
- Break Even Point calculator

## 💾 Penyimpanan Data:

- Menggunakan localStorage untuk menyimpan semua data
- Data tersimpan di browser dan tidak hilang saat refresh

## 🎨 Antarmuka:

- Modern dan responsif menggunakan Shadcn-UI
- Navigasi mudah dengan tab system
- Format mata uang Rupiah Indonesia
- Design yang clean dan professional

## technology stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/app.tsx` - Root component of the project
- `src/main.tsx` - Project entry point
- `src/index.css` - Existing CSS configuration

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration

## Note

The `@/` path alias points to the `src/` directory

# Commands

**Install Dependencies**

```shell
pnpm i
```

**Start Preview**

```shell
pnpm run dev
```

**To build**

```shell
pnpm run build
```
