// Mock leads data for the admin dashboard
// In production, replace with Supabase or a real backend

const STORAGE_KEY = 'sca_tech_leads'

const initialLeads = [
  // ── Mar 13 (Today) — Heavy spike ──
  { id: 1, name: 'Rajesh Sharma', phone: '+91 98765 43210', email: 'rajesh@email.com', city: 'Indore', type: 'Residential', message: 'Monthly bill around ₹3,000. Flat roof, 2-storey house.', status: 'New', date: '2026-03-13T08:10:00' },
  { id: 2, name: 'Priya Patel', phone: '+91 97531 24680', email: 'priya.p@gmail.com', city: 'Bhopal', type: 'Commercial', message: 'Rooftop solar for our 5000 sq ft office.', status: 'Called', date: '2026-03-13T09:22:00' },
  { id: 3, name: 'Sunita Joshi', phone: '+91 99887 66554', email: 'sunita@business.co.in', city: 'Indore', type: 'Industrial', message: 'Factory rooftop, 10,000 sq ft. Need 100kW system.', status: 'New', date: '2026-03-13T10:05:00' },
  { id: 4, name: 'Alok Trivedi', phone: '+91 91234 56789', email: '', city: 'Ujjain', type: 'Residential', message: 'Bill is ₹4,200/month. Tile roof.', status: 'New', date: '2026-03-13T10:45:00' },
  { id: 5, name: 'Meera Bhandari', phone: '+91 90012 34567', email: 'meera@yahoo.in', city: 'Dewas', type: 'Residential', message: 'Interested in subsidy scheme. 3kW system.', status: 'Called', date: '2026-03-13T11:30:00' },
  { id: 6, name: 'Harish Pandey', phone: '+91 88123 45678', email: 'harish@corp.in', city: 'Indore', type: 'Commercial', message: 'Hotel rooftop — 3 floors. Monthly bill ₹80,000.', status: 'New', date: '2026-03-13T12:15:00' },
  { id: 7, name: 'Kavita Yadav', phone: '+91 77234 56789', email: 'kavita@example.com', city: 'Bhopal', type: 'Residential', message: 'PM Surya Ghar subsidy. 4kW system.', status: 'New', date: '2026-03-13T13:00:00' },
  { id: 8, name: 'Saurabh Dixit', phone: '+91 66345 67890', email: '', city: 'Ratlam', type: 'Not Sure', message: 'Not sure how many kW I need. Bill is ₹6,000.', status: 'New', date: '2026-03-13T14:10:00' },
  { id: 9, name: 'Tanvi Agarwal', phone: '+91 55456 78901', email: 'tanvi@outlook.com', city: 'Indore', type: 'Residential', message: '5kW with battery backup.', status: 'Called', date: '2026-03-13T15:30:00' },
  { id: 10, name: 'Rohit Chouhan', phone: '+91 44567 89012', email: '', city: 'Pithampur', type: 'Industrial', message: 'Carport solar for factory parking. 50kW est.', status: 'New', date: '2026-03-13T16:20:00' },

  // ── Mar 12 — Medium day ──
  { id: 11, name: 'Amit Verma', phone: '+91 88776 55443', email: '', city: 'Ujjain', type: 'Residential', message: 'Want 5kW system with battery backup.', status: 'Converted', date: '2026-03-12T08:30:00' },
  { id: 12, name: 'Deepak Malhotra', phone: '+91 33221 99887', email: 'deepak.m@outlook.com', city: 'Bhopal', type: 'Commercial', message: 'Shopping mall rooftop installation.', status: 'Called', date: '2026-03-12T10:00:00' },
  { id: 13, name: 'Poonam Agarwal', phone: '+91 99001 55443', email: 'poonam@biz.in', city: 'Indore', type: 'Residential', message: '7kW hybrid system with battery.', status: 'Converted', date: '2026-03-12T11:45:00' },
  { id: 14, name: 'Nikhil Rawat', phone: '+91 98800 11223', email: 'nikhil@rawat.in', city: 'Dhar', type: 'Residential', message: 'Two-storey house. Bill ₹3,500.', status: 'Called', date: '2026-03-12T13:20:00' },
  { id: 15, name: 'Shweta Mishra', phone: '+91 97700 22334', email: '', city: 'Mhow', type: 'Commercial', message: 'Pharmacy chain needs solar for 4 branches.', status: 'New', date: '2026-03-12T15:10:00' },

  // ── Mar 11 — Slow day ──
  { id: 16, name: 'Vikram Singh', phone: '+91 77665 44332', email: 'vikram.singh@corp.com', city: 'Dewas', type: 'Commercial', message: 'Warehouse solar. Monthly bill ₹50,000+.', status: 'Called', date: '2026-03-11T09:15:00' },
  { id: 17, name: 'Neha Gupta', phone: '+91 66554 33221', email: 'neha.gupta@yahoo.com', city: 'Indore', type: 'Residential', message: '3kW system for apartment.', status: 'Converted', date: '2026-03-11T14:00:00' },

  // ── Mar 10 — Zero leads (gap day — no entries) ──

  // ── Mar 9 — Zero leads (gap day — no entries) ──

  // ── Mar 8 — Good day ──
  { id: 18, name: 'Manoj Kumar', phone: '+91 11009 77665', email: 'manoj.k@gmail.com', city: 'Dhar', type: 'Industrial', message: 'Ground-mount solar for plant. 200kW target.', status: 'Converted', date: '2026-03-08T08:40:00' },
  { id: 19, name: 'Ritu Chauhan', phone: '+91 77889 33221', email: 'ritu.c@hotmail.com', city: 'Indore', type: 'Residential', message: '3kW system. Bill ₹2,500/month.', status: 'Converted', date: '2026-03-08T10:00:00' },
  { id: 20, name: 'Arun Saxena', phone: '+91 66778 22110', email: 'arun.s@corp.in', city: 'Mhow', type: 'Commercial', message: 'Restaurant chain — 3 locations need solar.', status: 'Called', date: '2026-03-08T11:30:00' },
  { id: 21, name: 'Preeti Sharma', phone: '+91 95555 11111', email: 'preeti@gmail.com', city: 'Bhopal', type: 'Residential', message: 'Heard about net metering. Want details.', status: 'New', date: '2026-03-08T13:00:00' },
  { id: 22, name: 'Gaurav Shukla', phone: '+91 94444 22222', email: '', city: 'Pithampur', type: 'Industrial', message: 'Textile factory. 150kW needed.', status: 'Called', date: '2026-03-08T14:45:00' },
  { id: 23, name: 'Anjali Singh', phone: '+91 93333 33333', email: 'anjali@biz.co.in', city: 'Ratlam', type: 'Commercial', message: 'Cold storage unit. High electricity bill ₹1.2L/month.', status: 'Not Interested', date: '2026-03-08T16:00:00' },

  // ── Mar 7 — Low day ──
  { id: 24, name: 'Sanjay Mishra', phone: '+91 88990 44332', email: '', city: 'Pithampur', type: 'Industrial', message: 'Carport solar for factory parking lot.', status: 'New', date: '2026-03-07T09:00:00' },
  { id: 25, name: 'Komal Jain', phone: '+91 92222 44444', email: 'komal@jain.in', city: 'Ujjain', type: 'Residential', message: 'Want government subsidy info. Single floor home.', status: 'Called', date: '2026-03-07T11:00:00' },

  // ── Mar 6 — Zero leads ──

  // ── Mar 5 — Big spike ──
  { id: 26, name: 'Rahul Dubey', phone: '+91 55443 22110', email: '', city: 'Ratlam', type: 'Not Sure', message: 'Want to understand solar for old house.', status: 'Not Interested', date: '2026-03-05T08:00:00' },
  { id: 27, name: 'Ananya Tiwari', phone: '+91 22110 88776', email: '', city: 'Ujjain', type: 'Residential', message: 'Monthly bill ₹5,000. Want off-grid setup.', status: 'New', date: '2026-03-05T09:10:00' },
  { id: 28, name: 'Dinesh Rawat', phone: '+91 91111 55555', email: 'dinesh@rawat.co.in', city: 'Indore', type: 'Commercial', message: 'IT office. 8kW system. Bill ₹25,000/month.', status: 'Converted', date: '2026-03-05T10:00:00' },
  { id: 29, name: 'Sarita Rao', phone: '+91 90000 66666', email: 'sarita.rao@gmail.com', city: 'Bhopal', type: 'Residential', message: 'New house construction. Want solar from the start.', status: 'Converted', date: '2026-03-05T10:45:00' },
  { id: 30, name: 'Bharat Joshi', phone: '+91 89999 77777', email: '', city: 'Dewas', type: 'Industrial', message: 'Paper mill. Massive power consumption. 500kW needed.', status: 'Called', date: '2026-03-05T11:30:00' },
  { id: 31, name: 'Madhuri Kulkarni', phone: '+91 88888 88888', email: 'madhuri@kulkarni.in', city: 'Indore', type: 'Residential', message: 'Bill ₹7,000/month. Terrace house. Want full solar.', status: 'Called', date: '2026-03-05T12:15:00' },
  { id: 32, name: 'Atul Pandey', phone: '+91 87777 99999', email: '', city: 'Dhar', type: 'Residential', message: 'Want to reduce bill by 80%.', status: 'New', date: '2026-03-05T13:00:00' },
  { id: 33, name: 'Shreya Bose', phone: '+91 86666 10101', email: 'shreya@bose.in', city: 'Mhow', type: 'Commercial', message: 'School building. Want solar for classrooms.', status: 'Converted', date: '2026-03-05T14:00:00' },
  { id: 34, name: 'Vaibhav Tomar', phone: '+91 85555 21212', email: '', city: 'Pithampur', type: 'Industrial', message: 'Auto parts plant. 300kW estimate.', status: 'Called', date: '2026-03-05T15:10:00' },
  { id: 35, name: 'Priyanka Bajpai', phone: '+91 84444 32323', email: 'priyanka@bajpai.com', city: 'Ratlam', type: 'Residential', message: 'Joint family house. Bill ₹8,000/month.', status: 'New', date: '2026-03-05T16:00:00' },
  { id: 36, name: 'Rohit Malviya', phone: '+91 83333 43434', email: '', city: 'Bhopal', type: 'Not Sure', message: 'Referred by friend. Want to know about costs.', status: 'Called', date: '2026-03-05T16:45:00' },

  // ── Mar 4 — Medium ──
  { id: 37, name: 'Nandini Saxena', phone: '+91 82222 54545', email: 'nandini@corp.in', city: 'Indore', type: 'Commercial', message: 'Clinic. Monthly bill ₹15,000. Want 10kW.', status: 'Converted', date: '2026-03-04T09:00:00' },
  { id: 38, name: 'Akash Tiwari', phone: '+91 81111 65656', email: '', city: 'Ujjain', type: 'Residential', message: '6kW with battery for power backup.', status: 'Called', date: '2026-03-04T10:30:00' },
  { id: 39, name: 'Ravi Shankar', phone: '+91 80000 76767', email: 'ravi@shankar.in', city: 'Dewas', type: 'Industrial', message: 'Pump sets solar. Agricultural use.', status: 'New', date: '2026-03-04T12:00:00' },
  { id: 40, name: 'Smita Verma', phone: '+91 79999 87878', email: '', city: 'Indore', type: 'Residential', message: 'Small house. 2kW should be enough.', status: 'Not Interested', date: '2026-03-04T14:00:00' },

  // ── Mar 3 — Zero leads ──

  // ── Mar 2 — Low ──
  { id: 41, name: 'Lalit Sharma', phone: '+91 78888 98989', email: 'lalit@sharma.co.in', city: 'Mhow', type: 'Commercial', message: 'Petrol pump solar. 24/7 usage.', status: 'Called', date: '2026-03-02T10:00:00' },
  { id: 42, name: 'Geeta Parihar', phone: '+91 77777 09090', email: '', city: 'Dhar', type: 'Residential', message: 'Heard from neighbour. Bill ₹2,000. Want to save money.', status: 'New', date: '2026-03-02T13:30:00' },

  // ── Mar 1 — Medium ──
  { id: 43, name: 'Abhishek Rai', phone: '+91 76543 10101', email: 'abhishek@rai.in', city: 'Indore', type: 'Residential', message: '8kW on terrace. Bill ₹9,000/month.', status: 'Converted', date: '2026-03-01T08:30:00' },
  { id: 44, name: 'Pooja Kaur', phone: '+91 75432 21212', email: 'pooja.kaur@gmail.com', city: 'Bhopal', type: 'Commercial', message: 'Gym rooftop. Monthly bill ₹35,000.', status: 'Converted', date: '2026-03-01T10:00:00' },
  { id: 45, name: 'Vivek Dubey', phone: '+91 74321 32323', email: '', city: 'Pithampur', type: 'Industrial', message: 'Chemical plant. High load. 400kW.', status: 'Called', date: '2026-03-01T11:30:00' },
  { id: 46, name: 'Suneel Patel', phone: '+91 73210 43434', email: 'suneel@patel.in', city: 'Ratlam', type: 'Residential', message: 'Small farm house. Off-grid option.', status: 'New', date: '2026-03-01T13:00:00' },

  // ── Feb 28 — Low ──
  { id: 47, name: 'Archana Singh', phone: '+91 72109 54545', email: '', city: 'Ujjain', type: 'Residential', message: 'Rented house, owner agreed to solar.', status: 'Called', date: '2026-02-28T09:00:00' },
  { id: 48, name: 'Devendra Yadav', phone: '+91 71098 65656', email: 'devendra@biz.co', city: 'Indore', type: 'Commercial', message: 'Supermarket. Two floors. 20kW estimate.', status: 'New', date: '2026-02-28T14:00:00' },

  // ── Feb 27 — Spike ──
  { id: 49, name: 'Manisha Dixit', phone: '+91 70987 76767', email: 'manisha@dixit.in', city: 'Bhopal', type: 'Residential', message: 'Bill ₹6,500. 4-bedroom house. Flat RCC roof.', status: 'Converted', date: '2026-02-27T08:00:00' },
  { id: 50, name: 'Sandeep Gupta', phone: '+91 69876 87878', email: '', city: 'Dewas', type: 'Commercial', message: 'Hardware shop. Bill ₹12,000.', status: 'Called', date: '2026-02-27T09:15:00' },
  { id: 51, name: 'Rashmi Tiwari', phone: '+91 68765 98989', email: 'rashmi@tiwari.co.in', city: 'Indore', type: 'Residential', message: 'Society rooftop. 20 flats. Group buy.', status: 'Converted', date: '2026-02-27T10:30:00' },
  { id: 52, name: 'Dilip Jain', phone: '+91 67654 09090', email: '', city: 'Ratlam', type: 'Industrial', message: 'Rice mill. Huge power load. 600kW.', status: 'New', date: '2026-02-27T11:45:00' },
  { id: 53, name: 'Usha Mehta', phone: '+91 66543 10111', email: 'usha.mehta@gmail.com', city: 'Mhow', type: 'Residential', message: '3kW for small house. Bill ₹1,800.', status: 'Not Interested', date: '2026-02-27T13:00:00' },
  { id: 54, name: 'Tejas Shrivastav', phone: '+91 65432 21222', email: '', city: 'Dhar', type: 'Not Sure', message: 'Saw Facebook ad. Want to know more.', status: 'Called', date: '2026-02-27T14:15:00' },
  { id: 55, name: 'Pallavi Nair', phone: '+91 64321 32333', email: 'pallavi@nair.in', city: 'Bhopal', type: 'Commercial', message: 'Event hall rooftop. Monthly bill ₹45,000.', status: 'Converted', date: '2026-02-27T15:30:00' },
  { id: 56, name: 'Kishor Kale', phone: '+91 63210 43444', email: '', city: 'Pithampur', type: 'Industrial', message: 'Plastic moulding factory. 250kW.', status: 'New', date: '2026-02-27T16:45:00' },
]

export function getLeads() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) { /* ignore */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLeads))
  return initialLeads
}

export function saveLeads(leads) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
}

export function resetLeads() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLeads))
  return initialLeads
}

export function updateLeadStatus(id, newStatus) {
  const leads = getLeads()
  const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l)
  saveLeads(updated)
  return updated
}

// ── Stats ──────────────────────────────────────────────────

export function getStatsForDashboard(leads) {
  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const todayLeads = leads.filter(l => l.date.startsWith(todayStr))
  const weekLeads = leads.filter(l => new Date(l.date) >= weekAgo)
  const converted = leads.filter(l => l.status === 'Converted').length
  const conversionRate = leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0

  return {
    total: leads.length,
    today: todayLeads.length,
    thisWeek: weekLeads.length,
    conversionRate,
  }
}

export function getLeadsByDay(leads, days = 7) {
  const result = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'short' })
    const count = leads.filter(l => l.date.startsWith(dateStr)).length
    result.push({ date: dateStr, label: dayLabel, count })
  }
  return result
}

export function getLeadsByType(leads) {
  const types = ['Residential', 'Commercial', 'Industrial', 'Not Sure']
  return types.map(t => ({
    type: t,
    count: leads.filter(l => l.type === t).length,
  }))
}

export function getLeadsByCity(leads) {
  const cityMap = {}
  leads.forEach(l => {
    if (!cityMap[l.city]) cityMap[l.city] = { total: 0, converted: 0 }
    cityMap[l.city].total++
    if (l.status === 'Converted') cityMap[l.city].converted++
  })
  return Object.entries(cityMap)
    .map(([city, data]) => ({
      city,
      total: data.total,
      converted: data.converted,
      rate: data.total > 0 ? Math.round((data.converted / data.total) * 100) : 0,
    }))
    .sort((a, b) => b.total - a.total)
}

export function getStatusBreakdown(leads) {
  const statuses = ['New', 'Called', 'Converted', 'Not Interested']
  return statuses.map(s => ({
    status: s,
    count: leads.filter(l => l.status === s).length,
    percentage: leads.length > 0
      ? Math.round((leads.filter(l => l.status === s).length / leads.length) * 100)
      : 0,
  }))
}

// ── CSV Export ─────────────────────────────────────────────

export function exportToCSV(leads, filename = 'sca-tech-leads.csv') {
  const headers = ['Name', 'Phone', 'Email', 'City', 'System Type', 'Message', 'Status', 'Date & Time']
  const rows = leads.map(l => [
    l.name,
    l.phone,
    l.email || '-',
    l.city,
    l.type,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    l.status,
    new Date(l.date).toLocaleString('en-IN'),
  ])
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}