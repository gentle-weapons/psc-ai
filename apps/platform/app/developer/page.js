// The main page for developer dashboard

'use client';
 
import { useState } from 'react'; 
import NavigationBar from '../../components/NavigationBar';
import StatsRow from '../../components/StatsRow';
import SearchFilters from '../../components/SearchFilters';
import AgentList from '../../components/AgentList';
import AgentDetail from '../../components/AgentDetail';

// Placeholder data
const activeCount = 1;
const firedCount = 3;
const avgScore = 82;
const totalReviews = 145;

// Colors used
const COLORS = {
  green: '#00FF88',
  amber: '#F5A623',
  purple: '#8B5CF6',
  blue: '#4A90E2',
  surface: '#1a1a1a',
  surfaceHigh: '#222222',
  border: '#2a2a2a',
  text: '#ffffff',
  textMuted: '#888888',
  textDim: '#555555',
  red: '#FF4D4D',
  blueMuted: '#1e3a5f',
  greenMuted: '#1f3d2b',
};
 
// Placeholder filters
const status = ['all', 'active', 'fired'];

// Placeholder agent
const AGENTS = [
  {
    id: "agt-001",
    name: "TestAgent01",
    version: "v2.3.1",
    framework: "LangChain",
    status: "active",
    score: 87,
    tags: [],
    reviews: 142,
    metrics: {
      goalCompletion: 91,
      latencyMs: 2340,
      costPerRun: 0.043,
      pathEfficiency: 84,
    },
  },
  {
    id: "agt-002",
    name: "TestAgent02",
    version: "v2.3.1",
    framework: "LangChain",
    status: "active",
    score: 40,
    tags: [],
    reviews: 142,
    metrics: {
      goalCompletion: 34,
      latencyMs: 5024,
      costPerRun: 0.432,
      pathEfficiency: 20,
    },
  },
];
  
export default function DeveloperPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
 
  // Filter by status function
  const filtered = AGENTS.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || filterStatus === 'all'
      ? true
      : a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const selectedAgent = AGENTS.find((a) => a.id === selectedId) ?? null;
 
  return (
    <>
      <NavigationBar />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>
        {/* Hero Section */}
        <div className="hero">
          <h1>Agent Performance Reviews</h1>
          <p className="hero-subtitle">Monitor, evaluate, and manage your agents.</p>
          <StatsRow
            activeCount={activeCount}
            firedCount={firedCount}
            avgScore={avgScore}
            totalReviews={totalReviews}
            COLORS={COLORS}
          />
        </div>
 
        {/* Display Agent Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '340px 1fr',
          gap: 16,
          alignItems: 'start',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SearchFilters
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              status={status}
              COLORS={COLORS}
            />
            <AgentList
              filtered={filtered}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              COLORS={COLORS}
            />
          </div>
          <AgentDetail agent={selectedAgent} COLORS={COLORS} />
        </div>
      </div>
    </>
  );
}