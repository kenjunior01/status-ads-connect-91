import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  X,
  Star,
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
  showPriceFilter?: boolean;
  showNicheFilter?: boolean;
  showRatingFilter?: boolean;
  showLocationFilter?: boolean;
  className?: string;
}

interface FilterState {
  search: string;
  niche: string;
  priceRange: number[];
  rating: number;
  location: string;
  verified: boolean;
  badgeLevel: string;
}

const niches = [
  "Beleza & Moda",
  "Fitness & Saúde", 
  "Tecnologia",
  "Lifestyle",
  "Culinária",
  "Viagem",
  "Games",
  "Educação",
  "Negócios",
  "Arte & Design"
];

const locations = [
  "São Paulo",
  "Rio de Janeiro", 
  "Belo Horizonte",
  "Brasília",
  "Porto Alegre",
  "Salvador",
  "Recife",
  "Curitiba",
  "Fortaleza",
  "Goiânia"
];

const badgeLevels = [
  { value: "bronze", label: "Novo Talento", color: "bg-amber-600" },
  { value: "silver", label: "Em Crescimento", color: "bg-slate-400" },
  { value: "gold", label: "Top Performer", color: "bg-amber-400" },
  { value: "platinum", label: "Elite", color: "bg-purple-500" }
];

export const SearchFilters = ({ 
  onFiltersChange,
  showPriceFilter = true,
  showNicheFilter = true,
  showRatingFilter = true,
  showLocationFilter = true,
  className 
}: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    niche: "",
    priceRange: [0, 1000],
    rating: 0,
    location: "",
    verified: false,
    badgeLevel: ""
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);

    // Update active filters for badges
    updateActiveFilters(newFilters);
  };

  const updateActiveFilters = (currentFilters: FilterState) => {
    const active: string[] = [];
    
    if (currentFilters.niche) active.push(`Nicho: ${currentFilters.niche}`);
    if (currentFilters.location) active.push(`Local: ${currentFilters.location}`);
    if (currentFilters.rating > 0) active.push(`${currentFilters.rating}+ estrelas`);
    if (currentFilters.verified) active.push("Verificados");
    if (currentFilters.badgeLevel) {
      const badge = badgeLevels.find(b => b.value === currentFilters.badgeLevel);
      if (badge) active.push(badge.label);
    }
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 1000) {
      active.push(`R$ ${currentFilters.priceRange[0]} - R$ ${currentFilters.priceRange[1]}`);
    }

    setActiveFilters(active);
  };

  const clearFilter = (filterText: string) => {
    const newFilters = { ...filters };
    
    if (filterText.includes("Nicho:")) newFilters.niche = "";
    if (filterText.includes("Local:")) newFilters.location = "";
    if (filterText.includes("estrelas")) newFilters.rating = 0;
    if (filterText === "Verificados") newFilters.verified = false;
    if (badgeLevels.some(b => b.label === filterText)) newFilters.badgeLevel = "";
    if (filterText.includes("R$")) newFilters.priceRange = [0, 1000];

    setFilters(newFilters);
    onFiltersChange?.(newFilters);
    updateActiveFilters(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      niche: "",
      priceRange: [0, 1000],
      rating: 0,
      location: "",
      verified: false,
      badgeLevel: ""
    };
    
    setFilters(defaultFilters);
    setActiveFilters([]);
    onFiltersChange?.(defaultFilters);
  };

  return (
    <div className={className}>
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar criadores, nichos, localização..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filtros</h4>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Limpar tudo
                  </Button>
                )}
              </div>

              {/* Niche Filter */}
              {showNicheFilter && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Nicho</label>
                  <Select value={filters.niche} onValueChange={(value) => updateFilter("niche", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os nichos</SelectItem>
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Price Range Filter */}
              {showPriceFilter && (
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Faixa de Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter("priceRange", value)}
                    max={1000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                </div>
              )}

              {/* Rating Filter */}
              {showRatingFilter && (
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Avaliação Mínima
                  </label>
                  <Select 
                    value={filters.rating.toString()} 
                    onValueChange={(value) => updateFilter("rating", parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer avaliação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Qualquer avaliação</SelectItem>
                      <SelectItem value="3">3+ estrelas</SelectItem>
                      <SelectItem value="4">4+ estrelas</SelectItem>
                      <SelectItem value="4.5">4.5+ estrelas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Location Filter */}
              {showLocationFilter && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Localização</label>
                  <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer localização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualquer localização</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Badge Level */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Nível
                </label>
                <Select value={filters.badgeLevel} onValueChange={(value) => updateFilter("badgeLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Qualquer nível</SelectItem>
                    {badgeLevels.map((badge) => (
                      <SelectItem key={badge.value} value={badge.value}>
                        {badge.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="flex items-center gap-1 pr-1"
            >
              {filter}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter(filter)}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};