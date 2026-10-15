"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PastelBorder } from "@/components/PastelBorder";
import { CategoryFilter } from "@/components/CategoryFilter";
import { LiveFryerSection } from "@/components/LiveFryerSection";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { FloatingCartBar } from "@/components/FloatingCartBar";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutView } from "@/components/CheckoutView";
import { OrderSuccessView } from "@/components/OrderSuccessView";
import { HowItWorks } from "@/components/HowItWorks";
import { DesktopFooter } from "@/components/DesktopFooter";
import { BottomNav } from "@/components/BottomNav";

import { PRODUCTS } from "@/data/menu";
import { Product, ProductAddon, ProductCategory } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useLocaleStore } from "@/store/useLocaleStore";

type AppView = "menu" | "checkout" | "order-success";

export default function HomePage() {
  const [currentView, setCurrentView] = useState<AppView>("menu");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("destaques");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<"cardapio" | "buscar" | "pedidos">("cardapio");

  const { addItem, undoLastAdd } = useCartStore();
  const { favorites, isFavorite } = useFavoritesStore();
  const { locale, t } = useLocaleStore();

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    const prodName = locale === "en" ? product.nameEn : product.name;
    toast.success(`${prodName} ${t.addedToCartToast}`, {
      action: {
        label: t.undo,
        onClick: () => undoLastAdd(),
      },
    });
  };

  const handleAddToCartWithAddons = (
    product: Product,
    quantity: number,
    addons: ProductAddon[],
    notes: string
  ) => {
    addItem(product, quantity, addons, notes);
    const prodName = locale === "en" ? product.nameEn : product.name;
    toast.success(`${prodName} ${t.addedToCartToast}`, {
      action: {
        label: t.undo,
        onClick: () => undoLastAdd(),
      },
    });
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q) || product.nameEn.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q) || product.descriptionEn.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }

    // Favorites filter
    if (showOnlyFavorites) {
      return isFavorite(product.id);
    }

    // Category filter
    if (selectedCategory === "all" || selectedCategory === "destaques") {
      return true;
    }

    return product.category === selectedCategory;
  });

  // Grouped by categories for standard view
  const savoryProducts = filteredProducts.filter((p) => p.category === "salgados");
  const comboProducts = filteredProducts.filter((p) => p.category === "combos");
  const sweetProducts = filteredProducts.filter((p) => p.category === "doces");
  const drinkProducts = filteredProducts.filter((p) => p.category === "bebidas");

  // Featured Queijo pastel
  const featuredQueijo = PRODUCTS.find((p) => p.id === "queijo")!;

  return (
    <main className="min-h-screen bg-brand-cream dark:bg-brand-dark-bg text-brand-text-primary dark:text-brand-dark-text transition-colors">
      <AnimatePresence mode="wait">
        {/* VIEW 1: CHECKOUT */}
        {currentView === "checkout" && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <CheckoutView
              onBack={() => setCurrentView("menu")}
              onOrderCompleted={() => setCurrentView("order-success")}
            />
          </motion.div>
        )}

        {/* VIEW 2: ORDER SUCCESS */}
        {currentView === "order-success" && (
          <motion.div
            key="order-success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <OrderSuccessView
              onBackToMenu={() => {
                setCurrentView("menu");
                setActiveBottomTab("cardapio");
              }}
            />
          </motion.div>
        )}

        {/* VIEW 3: MAIN MENU */}
        {currentView === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col pb-20 md:pb-0"
          >
            {/* Header */}
            <Header onOpenCart={() => setIsCartOpen(true)} />

            {/* Hero Section */}
            <Hero onSelectFeaturedProduct={() => handleSelectProduct(featuredQueijo)} />

            {/* Repeating Pastel Border Divisor */}
            <PastelBorder />

            {/* Sticky Category & Search Filter */}
            <div id="cardapio" className="scroll-mt-24">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setShowOnlyFavorites(false);
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                showOnlyFavorites={showOnlyFavorites}
                onToggleFavorites={() => setShowOnlyFavorites(!showOnlyFavorites)}
                favoritesCount={favorites.length}
              />
            </div>

            {/* Live Fryer Carousel (Only on default view / highlights) */}
            {!showOnlyFavorites && searchQuery.trim() === "" && (selectedCategory === "all" || selectedCategory === "destaques") && (
              <LiveFryerSection
                products={PRODUCTS}
                onSelectProduct={handleSelectProduct}
                onQuickAdd={handleQuickAdd}
                onSeeAll={() => setSelectedCategory("all")}
              />
            )}

            {/* Catalog Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 w-full">
              {/* Section 1: Salgados */}
              {savoryProducts.length > 0 && (
                <section className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-red dark:text-[#5CEE1B]">
                      {t.savorySectionSubtitle}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text-primary dark:text-brand-dark-text">
                      {t.savorySectionTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {savoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant="vertical"
                        onSelectProduct={handleSelectProduct}
                        onQuickAdd={handleQuickAdd}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Section 2: Combos */}
              {comboProducts.length > 0 && (
                <section id="combos" className="flex flex-col gap-4 scroll-mt-24">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-red dark:text-[#5CEE1B]">
                      {t.comboSectionSubtitle}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text-primary dark:text-brand-dark-text">
                      {t.comboSectionTitle}
                    </h2>
                  </div>

                  {comboProducts.map((combo) => (
                    <ProductCard
                      key={combo.id}
                      product={combo}
                      variant="combo"
                      onSelectProduct={handleSelectProduct}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </section>
              )}

              {/* Section 3: Doces */}
              {sweetProducts.length > 0 && (
                <section className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-red dark:text-[#5CEE1B]">
                      {t.sweetSectionSubtitle}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text-primary dark:text-brand-dark-text">
                      {t.sweetSectionTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sweetProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant="horizontal"
                        onSelectProduct={handleSelectProduct}
                        onQuickAdd={handleQuickAdd}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Section 4: Bebidas */}
              {drinkProducts.length > 0 && (
                <section className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-red dark:text-[#5CEE1B]">
                      {t.drinksSectionSubtitle}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text-primary dark:text-brand-dark-text">
                      {t.drinksSectionTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drinkProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant="horizontal"
                        onSelectProduct={handleSelectProduct}
                        onQuickAdd={handleQuickAdd}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Empty state when filtering */}
              {filteredProducts.length === 0 && (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl">🥟</span>
                  <h3 className="font-display font-bold text-lg">Nenhum pastel encontrado</h3>
                  <p className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                    Tente buscar por outro sabor ou limpe os filtros.
                  </p>
                </div>
              )}
            </div>

            {/* Desktop How It Works */}
            <HowItWorks />

            {/* Desktop Footer */}
            <DesktopFooter />

            {/* Floating Cart Bar (Appears when items are in bag) */}
            <FloatingCartBar onOpenCart={() => setIsCartOpen(true)} />

            {/* Mobile Bottom Navigation Bar */}
            <BottomNav
              activeTab={activeBottomTab}
              onTabChange={(tab) => {
                setActiveBottomTab(tab);
                if (tab === "cardapio") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else if (tab === "buscar") {
                  const searchEl = document.getElementById("cardapio");
                  searchEl?.scrollIntoView({ behavior: "smooth" });
                } else if (tab === "pedidos") {
                  setCurrentView("order-success");
                }
              }}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* Product Detail Modal / Bottom Sheet */}
            <ProductDetailModal
              product={selectedProduct}
              isOpen={isDetailOpen}
              onClose={() => setIsDetailOpen(false)}
              onAddToCart={handleAddToCartWithAddons}
            />

            {/* Cart Drawer */}
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onProceedToCheckout={() => setCurrentView("checkout")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
