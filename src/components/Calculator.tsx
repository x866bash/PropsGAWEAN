import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator as CalculatorIcon, DollarSign, Percent, TrendingUp } from 'lucide-react';

const Calculator: React.FC = () => {
  const [profitCalc, setProfitCalc] = useState({
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
  });

  const [marginCalc, setMarginCalc] = useState({
    cost: '',
    marginPercent: '',
  });

  const [breakEvenCalc, setBreakEvenCalc] = useState({
    fixedCosts: '',
    variableCostPerUnit: '',
    sellingPricePerUnit: '',
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  // Profit Calculator
  const purchasePrice = parseFloat(profitCalc.purchasePrice) || 0;
  const sellingPrice = parseFloat(profitCalc.sellingPrice) || 0;
  const quantity = parseFloat(profitCalc.quantity) || 0;
  
  const profitPerUnit = sellingPrice - purchasePrice;
  const totalProfit = profitPerUnit * quantity;
  const profitMargin = sellingPrice > 0 ? (profitPerUnit / sellingPrice) * 100 : 0;

  // Margin Calculator
  const cost = parseFloat(marginCalc.cost) || 0;
  const marginPercent = parseFloat(marginCalc.marginPercent) || 0;
  const suggestedPrice = cost > 0 ? cost / (1 - marginPercent / 100) : 0;

  // Break Even Calculator
  const fixedCosts = parseFloat(breakEvenCalc.fixedCosts) || 0;
  const variableCostPerUnit = parseFloat(breakEvenCalc.variableCostPerUnit) || 0;
  const sellingPricePerUnit = parseFloat(breakEvenCalc.sellingPricePerUnit) || 0;
  
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CalculatorIcon className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Kalkulator Bisnis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Profit Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Kalkulator Keuntungan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="purchasePrice">Harga Beli</Label>
              <Input
                id="purchasePrice"
                type="number"
                value={profitCalc.purchasePrice}
                onChange={(e) => setProfitCalc({ ...profitCalc, purchasePrice: e.target.value })}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="sellingPrice">Harga Jual</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={profitCalc.sellingPrice}
                onChange={(e) => setProfitCalc({ ...profitCalc, sellingPrice: e.target.value })}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="quantity">Jumlah</Label>
              <Input
                id="quantity"
                type="number"
                value={profitCalc.quantity}
                onChange={(e) => setProfitCalc({ ...profitCalc, quantity: e.target.value })}
                placeholder="1"
              />
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Keuntungan per unit:</span>
                <span className={`text-sm font-medium ${profitPerUnit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(profitPerUnit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total keuntungan:</span>
                <span className={`text-sm font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalProfit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Margin keuntungan:</span>
                <span className="text-sm font-medium">
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Margin Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Percent className="w-5 h-5" />
              <span>Kalkulator Margin</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cost">Harga Pokok</Label>
              <Input
                id="cost"
                type="number"
                value={marginCalc.cost}
                onChange={(e) => setMarginCalc({ ...marginCalc, cost: e.target.value })}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="marginPercent">Target Margin (%)</Label>
              <Input
                id="marginPercent"
                type="number"
                value={marginCalc.marginPercent}
                onChange={(e) => setMarginCalc({ ...marginCalc, marginPercent: e.target.value })}
                placeholder="30"
              />
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Harga jual yang disarankan:</span>
                <span className="text-sm font-bold text-blue-600">
                  {formatCurrency(suggestedPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Keuntungan per unit:</span>
                <span className="text-sm font-medium text-green-600">
                  {formatCurrency(suggestedPrice - cost)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Break Even Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Break Even Point</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fixedCosts">Biaya Tetap</Label>
              <Input
                id="fixedCosts"
                type="number"
                value={breakEvenCalc.fixedCosts}
                onChange={(e) => setBreakEvenCalc({ ...breakEvenCalc, fixedCosts: e.target.value })}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="variableCostPerUnit">Biaya Variabel per Unit</Label>
              <Input
                id="variableCostPerUnit"
                type="number"
                value={breakEvenCalc.variableCostPerUnit}
                onChange={(e) => setBreakEvenCalc({ ...breakEvenCalc, variableCostPerUnit: e.target.value })}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="sellingPricePerUnit">Harga Jual per Unit</Label>
              <Input
                id="sellingPricePerUnit"
                type="number"
                value={breakEvenCalc.sellingPricePerUnit}
                onChange={(e) => setBreakEvenCalc({ ...breakEvenCalc, sellingPricePerUnit: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Unit untuk BEP:</span>
                <span className="text-sm font-bold text-orange-600">
                  {breakEvenUnits} unit
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pendapatan BEP:</span>
                <span className="text-sm font-medium text-orange-600">
                  {formatCurrency(breakEvenRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Margin kontribusi:</span>
                <span className="text-sm font-medium">
                  {formatCurrency(contributionMargin)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips Kalkulator Bisnis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Kalkulator Keuntungan</h4>
              <p className="text-muted-foreground">
                Hitung keuntungan dari penjualan produk berdasarkan harga beli, harga jual, dan jumlah yang terjual.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-600 mb-2">Kalkulator Margin</h4>
              <p className="text-muted-foreground">
                Tentukan harga jual yang tepat berdasarkan harga pokok dan target margin keuntungan yang diinginkan.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-orange-600 mb-2">Break Even Point</h4>
              <p className="text-muted-foreground">
                Hitung berapa unit yang harus dijual untuk mencapai titik impas (tidak untung tidak rugi).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;