import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product, Sale, Expense, FinancialSummary } from '@/types';

interface BusinessContextType {
  products: Product[];
  sales: Sale[];
  expenses: Expense[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  getFinancialSummary: () => FinancialSummary;
  updateStock: (productId: string, newStock: number) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>('business_products', []);
  const [sales, setSales] = useLocalStorage<Sale[]>('business_sales', []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('business_expenses', []);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, ...productData, updatedAt: new Date() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateStock = (productId: string, newStock: number) => {
    updateProduct(productId, { stock: newStock });
  };

  const addSale = (saleData: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString(),
    };
    setSales([...sales, newSale]);
    
    // Update product stock
    const product = products.find(p => p.id === saleData.productId);
    if (product) {
      updateStock(saleData.productId, product.stock - saleData.quantity);
    }
  };

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const getFinancialSummary = (): FinancialSummary => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const totalSales = sales.length;
    const totalProducts = products.length;
    const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      totalSales,
      totalProducts,
      lowStockCount,
    };
  };

  const value = {
    products,
    sales,
    expenses,
    addProduct,
    updateProduct,
    deleteProduct,
    addSale,
    addExpense,
    deleteExpense,
    getFinancialSummary,
    updateStock,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};