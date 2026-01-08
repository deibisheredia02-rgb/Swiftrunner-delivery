import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, TranslationStructure } from '../types';

const translations: Record<Language, TranslationStructure> = {
  en: {
    hero: {
      subtitle: "NYC's AI-Powered Anything Delivery",
      badge: "⚡ 19 minutes or it’s free",
      description: "Coming February 2026. The delivery service that makes your current apps look like dial-up internet.",
      waitlist: "New Yorkers joined",
      cta: "Join Waitlist",
      timeLabels: { d: "Days", h: "Hrs", m: "Min", s: "Sec" }
    },
    features: {
      title: "Why SwiftRush",
      titleAccent: "Wins",
      card1: { title: "Hyper-Personal AI", desc: "Predicts your order before you think it. It knows you want a bagel at 9:15 AM on Sundays. It's already en route." },
      card2: { title: "18-22 min Average", desc: "A network of micro-fulfillment centers + advanced predictive routing algorithms = the fastest delivery in NYC history." },
      card3: { title: "Swift Prime", desc: "$9.99/mo. Unlimited free delivery. Exclusive AI perks. No service fees. Launch offer: $1.99 for first 6 months." }
    },
    dashboard: {
      title: "Your Future",
      titleAccent: "Dashboard",
      tabs: { home: "Home", orders: "Orders", prime: "Prime", favorites: "Favorites" },
      emptyState: { title: "SwiftAI Dashboard", desc: "Experience our predictive engine. Let AI guess what you crave right now based on NYC weather and time.", button: "Predict My Order", loading: "Consulting the Algorithm..." },
      order: { autoStaged: "Auto-Staged", confirm: "Confirm Order", dismiss: "Dismiss", aiInsight: "AI Insight" },
      activeOrders: { title: "Active Orders", status: "Drone #492 approaching drop zone", delivered: "Delivered" },
      prime: { saved: "Saved this month with Prime", activity: "Savings Activity (Last 7 Days)" },
      favorites: { text: "Your AI is still learning your taste profile.", subtext: "Order 3 more times to unlock predictions." }
    },
    footer: {
      title: "Don't be the last to know.",
      subtitle: "First 10,000 signups get Lifetime Prime Free. (12 spots left)",
      placeholder: "you@email.com",
      button: "Secure Spot",
      success: "You are in! 🚀",
      copyright: "© 2025 SwiftRush NYC.",
      tagline: "Built for New Yorkers who hate waiting."
    }
  },
  es: {
    hero: {
      subtitle: "Entregas con IA en NYC para todo",
      badge: "⚡ 19 minutos o es gratis",
      description: "Llega en febrero de 2026. El servicio que hace que tus apps actuales parezcan internet dial-up.",
      waitlist: "Neoyorquinos unidos",
      cta: "Unirse a la lista",
      timeLabels: { d: "Días", h: "Hrs", m: "Min", s: "Seg" }
    },
    features: {
      title: "Por qué SwiftRush",
      titleAccent: "Gana",
      card1: { title: "IA Hiper-Personal", desc: "Predice tu pedido antes de que lo pienses. Sabe que quieres un bagel a las 9:15 AM los domingos. Ya está en camino." },
      card2: { title: "Promedio 18-22 min", desc: "Una red de micro-centros + algoritmos de ruta predictiva = la entrega más rápida en la historia de NYC." },
      card3: { title: "Swift Prime", desc: "$9.99/mes. Entregas ilimitadas gratis. Beneficios exclusivos de IA. Sin tarifas de servicio. Oferta: $1.99 los primeros 6 meses." }
    },
    dashboard: {
      title: "Tu Futuro",
      titleAccent: "Panel de Control",
      tabs: { home: "Inicio", orders: "Pedidos", prime: "Prime", favorites: "Favoritos" },
      emptyState: { title: "Panel SwiftAI", desc: "Prueba nuestro motor predictivo. Deja que la IA adivine qué se te antoja según el clima y la hora en NYC.", button: "Predecir mi Orden", loading: "Consultando Algoritmo..." },
      order: { autoStaged: "Auto-Preparado", confirm: "Confirmar Orden", dismiss: "Descartar", aiInsight: "Insight de IA" },
      activeOrders: { title: "Pedidos Activos", status: "Dron #492 acercándose a zona de entrega", delivered: "Entregado" },
      prime: { saved: "Ahorrado este mes con Prime", activity: "Actividad de Ahorro (7 Días)" },
      favorites: { text: "Tu IA aún está aprendiendo tus gustos.", subtext: "Pide 3 veces más para desbloquear predicciones." }
    },
    footer: {
      title: "No seas el último en enterarte.",
      subtitle: "Los primeros 10,000 registros obtienen Prime Vitalicio Gratis. (Quedan 12 lugares)",
      placeholder: "tu@email.com",
      button: "Asegurar Lugar",
      success: "¡Estás dentro! 🚀",
      copyright: "© 2025 SwiftRush NYC.",
      tagline: "Hecho para neoyorquinos que odian esperar."
    }
  },
  zh: {
    hero: {
      subtitle: "纽约的人工智能全能配送",
      badge: "⚡ 19分钟送达，否则免单",
      description: "2026年2月上线。让现有的配送应用看起来像拨号上网一样过时。",
      waitlist: "位纽约人已加入",
      cta: "加入候补名单",
      timeLabels: { d: "天", h: "时", m: "分", s: "秒" }
    },
    features: {
      title: "SwiftRush为何",
      titleAccent: "必胜",
      card1: { title: "超个性化AI", desc: "在你思考之前预测订单。它知道你周日早上9:15想要百吉饼。已经在路上了。" },
      card2: { title: "平均18-22分钟", desc: "微型履行中心网络 + 先进的预测路线算法 = 纽约历史上最快的配送。" },
      card3: { title: "Swift Prime", desc: "$9.99/月。无限免费配送。独家AI福利。无服务费。首发优惠：前6个月仅需$1.99。" }
    },
    dashboard: {
      title: "你未来的",
      titleAccent: "仪表盘",
      tabs: { home: "首页", orders: "订单", prime: "会员", favorites: "收藏" },
      emptyState: { title: "SwiftAI 仪表盘", desc: "体验我们的预测引擎。让AI根据纽约的天气和时间猜测你现在想吃什么。", button: "预测我的订单", loading: "正在咨询算法..." },
      order: { autoStaged: "自动准备中", confirm: "确认订单", dismiss: "忽略", aiInsight: "AI 见解" },
      activeOrders: { title: "进行中的订单", status: "无人机 #492 正在接近投放区", delivered: "已送达" },
      prime: { saved: "本月使用 Prime 节省", activity: "节省活动（最近7天）" },
      favorites: { text: "AI 正在学习你的口味偏好。", subtext: "再下单3次以解锁预测功能。" }
    },
    footer: {
      title: "不要做最后一个知道的人。",
      subtitle: "前10,000名注册者可获得终身免费 Prime。（仅剩12个名额）",
      placeholder: "you@email.com",
      button: "锁定名额",
      success: "加入成功！🚀",
      copyright: "© 2025 SwiftRush NYC.",
      tagline: "专为讨厌等待的纽约人打造。"
    }
  },
  fr: {
    hero: {
      subtitle: "La livraison IA pour tout à NYC",
      badge: "⚡ 19 minutes ou c'est gratuit",
      description: "Arrive en février 2026. Le service qui fait passer vos applis actuelles pour de l'internet bas débit.",
      waitlist: "New-Yorkais inscrits",
      cta: "Rejoindre la liste",
      timeLabels: { d: "Jours", h: "H", m: "Min", s: "Sec" }
    },
    features: {
      title: "Pourquoi SwiftRush",
      titleAccent: "Gagne",
      card1: { title: "IA Hyper-Personnelle", desc: "Prédit votre commande avant vous. Elle sait que vous voulez un bagel à 9h15 le dimanche. C'est déjà en route." },
      card2: { title: "Moyenne 18-22 min", desc: "Réseau de micro-centres + algorithmes de routage prédictif = la livraison la plus rapide de l'histoire de NYC." },
      card3: { title: "Swift Prime", desc: "9,99 $/mois. Livraison illimitée. Avantages IA exclusifs. Pas de frais de service. Offre de lancement : 1,99 $ pour les 6 premiers mois." }
    },
    dashboard: {
      title: "Votre Futur",
      titleAccent: "Tableau de Bord",
      tabs: { home: "Accueil", orders: "Commandes", prime: "Prime", favorites: "Favoris" },
      emptyState: { title: "Tableau de Bord SwiftAI", desc: "Testez notre moteur prédictif. Laissez l'IA deviner vos envies selon la météo et l'heure à NYC.", button: "Prédire ma commande", loading: "Consultation de l'algorithme..." },
      order: { autoStaged: "Auto-Préparé", confirm: "Confirmer", dismiss: "Ignorer", aiInsight: "Aperçu IA" },
      activeOrders: { title: "Commandes Actives", status: "Drone #492 en approche de la zone", delivered: "Livré" },
      prime: { saved: "Économisé ce mois avec Prime", activity: "Activité d'économie (7 jours)" },
      favorites: { text: "Votre IA apprend encore vos goûts.", subtext: "Commandez 3 fois de plus pour débloquer les prédictions." }
    },
    footer: {
      title: "Ne soyez pas le dernier informé.",
      subtitle: "Les 10 000 premiers inscrits obtiennent Prime à vie gratuitement. (12 places restantes)",
      placeholder: "vous@email.com",
      button: "Réserver sa place",
      success: "Vous êtes inscrit ! 🚀",
      copyright: "© 2025 SwiftRush NYC.",
      tagline: "Conçu pour les New-Yorkais qui détestent attendre."
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStructure;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};