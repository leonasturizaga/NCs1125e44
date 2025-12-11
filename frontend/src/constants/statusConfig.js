// src/constants/statusConfig.js
import { LuSquare, LuSquareCheckBig } from "react-icons/lu";
import { CheckCircle, Clock, XCircle, FileText, PackageSearch, UserSearch, CalendarSearch } from "lucide-react";

export const STATUS_CONFIG = {
    pending: 	{ Icon: Clock, 	   badge: "badge-pending", 	 label: "Pendiente" },
    approved: 	{ Icon: CheckCircle, badge: "badge-approved", label: "Aprobado" }, // ✅ Mantener
    rejected: 	{ Icon: XCircle, 	   badge: "badge-rejected", 	 label: "Rechazado" }, 
    draft: 		{ Icon: FileText, 	   badge: "badge-draft", 	     label: "Borrador" }, // Cambiado Draft -> Borrador
    published: { Icon: CheckCircle, badge: "badge-published", label: "Publicado" }, // Cambiado Published -> Publicado
    admin: 	{ Icon: Clock, 	   badge: "badge-admin", 	 label: "Administrador" },
    editor: 	{ Icon: Clock, 	   badge: "badge-editor", 	 label: "Editor" },
    visitante: 	{ Icon: FileText, 	   badge: "badge-visitante", 	 label: "Visitante" },
    true: 	{ Icon: LuSquareCheckBig, 	   badge: "badge-true", 	 label: "Activo" },
    false: 	{ Icon: LuSquare, 	   badge: "badge-false", 	 label: "Inactivo" },
    Clients: { Icon: UserSearch, 	   badge: "badge-clients", 	 label: "Clientes"},
    Suppliers: { Icon: Clock, 	   badge: "badge-suppliers", 	 label: "Proveedores"},
    Products: { Icon: PackageSearch, 	   badge: "badge-products", 	 label: "Productos"},
    Events: { Icon: CalendarSearch, 	   badge: "badge-events", 	 label: "Eventos"},
   };
