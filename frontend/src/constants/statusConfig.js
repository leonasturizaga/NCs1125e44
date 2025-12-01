// src/constants/statusConfig.js
import { CheckCircle, Clock, XCircle,FileText } from "lucide-react";

export const STATUS_CONFIG = {
    pending: 	{ Icon: Clock, 	   badge: "badge-pending", 	 label: "Pendiente" },
    approved: 	{ Icon: CheckCircle, badge: "badge-approved", label: "Aprobado" }, // ✅ Mantener
    rejected: 	{ Icon: XCircle, 	   badge: "badge-rejected", 	 label: "Rechazado" }, 
    draft: 		{ Icon: FileText, 	   badge: "badge-draft", 	     label: "Borrador" }, // Cambiado Draft -> Borrador
    published: { Icon: CheckCircle, badge: "badge-published", label: "Publicado" }, // Cambiado Published -> Publicado
};