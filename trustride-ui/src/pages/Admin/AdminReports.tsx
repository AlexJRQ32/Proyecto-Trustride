import { Layout } from '../../components/Layout/Layout';
import { Card, CardHeader } from '../../components/Card/Card';
import { useApp } from '../../context/AppContext';

export function AdminReports() {
  const { walks } = useApp();
  const completed = walks.filter(w => w.status === 'completed');
  const totalRevenue = completed.reduce((s, w) => s + w.price, 0);

  return (
    <Layout role="admin" title="Reportes" subtitle="Estadísticas">
      <div style={{ maxWidth: 1000, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          <Card padding="lg" style={{textAlign:'center'}}><div style={{fontSize:28,fontWeight:700}}>₡{totalRevenue.toLocaleString()}</div><div style={{fontSize:13,color:'var(--text-secondary)',marginTop:4}}>Ingresos</div></Card>
          <Card padding="lg" style={{textAlign:'center'}}><div style={{fontSize:28,fontWeight:700}}>{walks.length}</div><div style={{fontSize:13,color:'var(--text-secondary)',marginTop:4}}>Paseos</div></Card>
          <Card padding="lg" style={{textAlign:'center'}}><div style={{fontSize:28,fontWeight:700}}>{completed.length}</div><div style={{fontSize:13,color:'var(--text-secondary)',marginTop:4}}>Completados</div></Card>
          <Card padding="lg" style={{textAlign:'center'}}><div style={{fontSize:28,fontWeight:700}}>4.8</div><div style={{fontSize:13,color:'var(--text-secondary)',marginTop:4}}>Calificación</div></Card>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <Card padding="md">
            <CardHeader title="Ingresos por día" />
            <div style={{display:'flex',alignItems:'flex-end',gap:6,height:140,padding:'12px 0'}}>
              {[{d:'L',v:8500},{d:'M',v:12000},{d:'Mi',v:9800},{d:'J',v:14500},{d:'V',v:11200},{d:'S',v:15000},{d:'D',v:6000}].map((item,i)=>(
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <div style={{width:'100%',background:'var(--accent)',borderRadius:'4px 4px 0 0',height:`${(item.v/15000)*100}%`,minHeight:4}}></div>
                  <div style={{fontSize:10,color:'var(--text-tertiary)'}}>{item.d}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card padding="md">
            <CardHeader title="Top paseadores" />
            {[{name:'María García',avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',walks:156,earnings:546000},{name:'Juan López',avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',walks:142,earnings:497000}].map((w,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid var(--divider)'}}>
                <span style={{fontWeight:700,color:'var(--text-tertiary)',minWidth:24}}>#{i+1}</span>
                <img src={w.avatar} style={{width:36,height:36,borderRadius:'50%'}} alt={w.name} />
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{w.name}</div><div style={{fontSize:12,color:'var(--text-secondary)'}}>{w.walks} paseos · ₡{w.earnings.toLocaleString()}</div></div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
