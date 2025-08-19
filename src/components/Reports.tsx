import React, { useState } from 'react';
import { useBusinessContext } from '@/contexts/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  const { products, sales, expenses, getFinancialSummary } = useBusinessContext();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID');
  };

  const filterByPeriod = (items: { date: Date }[]) => {
    if (selectedPeriod === 'all') return items;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (selectedPeriod) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        return items.filter(item => new Date(item.date) >= filterDate);
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        return items.filter(item => new Date(item.date) >= filterDate);
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        return items.filter(item => new Date(item.date) >= filterDate);
      default:
        return items;
    }
  };

  const filteredSales = filterByPeriod(sales);
  const filteredExpenses = filterByPeriod(expenses);

  const periodRevenue = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const periodExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const periodProfit = periodRevenue - periodExpenses;

  // Product performance analysis
  const productSales = products.map(product => {
    const productSalesData = filteredSales.filter(sale => sale.productId === product.id);
    const totalSold = productSalesData.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalRevenue = productSalesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const profit = totalRevenue - (totalSold * product.purchasePrice);
    
    return {
      ...product,
      totalSold,
      totalRevenue,
      profit,
      profitMargin: totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Expense category analysis
  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topExpenseCategories = Object.entries(expensesByCategory)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Laporan & Analisis</h2>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Waktu</SelectItem>
            <SelectItem value="today">Hari Ini</SelectItem>
            <SelectItem value="week">7 Hari Terakhir</SelectItem>
            <SelectItem value="month">30 Hari Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(periodRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredSales.length} transaksi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(periodExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredExpenses.length} pengeluaran
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keuntungan Bersih</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${periodProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(periodProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Margin: {periodRevenue > 0 ? ((periodProfit / periodRevenue) * 100).toFixed(1) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performa Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>Terjual</TableHead>
                  <TableHead>Pendapatan</TableHead>
                  <TableHead>Keuntungan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productSales.slice(0, 10).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.totalSold}</TableCell>
                    <TableCell>{formatCurrency(product.totalRevenue)}</TableCell>
                    <TableCell>
                      <div className={product.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(product.profit)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Pengeluaran per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topExpenseCategories.map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{category}</p>
                    <p className="text-xs text-muted-foreground">
                      {((amount / periodExpenses) * 100).toFixed(1)}% dari total
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {formatCurrency(amount)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ...filteredSales.map(sale => ({
                  date: sale.date,
                  type: 'Penjualan',
                  description: `${sale.productName} (${sale.quantity} unit)`,
                  amount: sale.totalAmount,
                  isPositive: true
                })),
                ...filteredExpenses.map(expense => ({
                  date: expense.date,
                  type: 'Pengeluaran',
                  description: expense.description,
                  amount: expense.amount,
                  isPositive: false
                }))
              ]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.isPositive ? 'default' : 'secondary'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={transaction.isPositive ? 'text-green-600' : 'text-red-600'}>
                      {transaction.isPositive ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;