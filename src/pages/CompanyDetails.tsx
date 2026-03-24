import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Company } from '../lib/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Building2 } from 'lucide-react';
import PlanoContasTab from './tabs/PlanoContasTab';
import RegrasTab from './tabs/RegrasTab';
import ImportarOFXTab from './tabs/ImportarOFXTab';
import LancamentosTab from './tabs/LancamentosTab';

export default function CompanyDetails() {
  const { id } = useParams();
  const companyId = Number(id);
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState('plano-contas');

  useEffect(() => {
    if (companyId) {
      db.companies.get(companyId).then(setCompany);
    }
  }, [companyId]);

  if (!company) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="text-virgula-green hover:text-emerald-700 flex items-center gap-2 mb-4 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Empresas
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-virgula-card text-virgula-green rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.25)]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-500 font-mono mt-1">CNPJ: {company.cnpj}</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex w-full mb-8 bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
          <TabsTrigger 
            value="plano-contas" 
            className="flex-1 rounded-none border-b-2 border-transparent data-active:border-virgula-green data-active:text-virgula-green data-active:bg-transparent data-active:shadow-none py-3 text-base font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Plano de Contas
          </TabsTrigger>
          <TabsTrigger 
            value="regras" 
            className="flex-1 rounded-none border-b-2 border-transparent data-active:border-virgula-green data-active:text-virgula-green data-active:bg-transparent data-active:shadow-none py-3 text-base font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Vínculos Contábeis
          </TabsTrigger>
          <TabsTrigger 
            value="importar" 
            className="flex-1 rounded-none border-b-2 border-transparent data-active:border-virgula-green data-active:text-virgula-green data-active:bg-transparent data-active:shadow-none py-3 text-base font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Importar OFX
          </TabsTrigger>
          <TabsTrigger 
            value="lancamentos" 
            className="flex-1 rounded-none border-b-2 border-transparent data-active:border-virgula-green data-active:text-virgula-green data-active:bg-transparent data-active:shadow-none py-3 text-base font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Lançamentos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plano-contas">
          <PlanoContasTab companyId={companyId} />
        </TabsContent>
        
        <TabsContent value="regras">
          <RegrasTab companyId={companyId} />
        </TabsContent>
        
        <TabsContent value="importar">
          <ImportarOFXTab companyId={companyId} onImportSuccess={() => setActiveTab('lancamentos')} />
        </TabsContent>
        
        <TabsContent value="lancamentos">
          <LancamentosTab companyId={companyId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
