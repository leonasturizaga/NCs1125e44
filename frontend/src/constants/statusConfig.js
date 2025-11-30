// src/constants/statusConfig.js
import { CheckCircle, Clock, XCircle } from "lucide-react";

export const STATUS_CONFIG = {
   pending:   { Icon: Clock,      badge: "badge-pending",   label: "Pendiente" },
   approved:  { Icon: CheckCircle, badge: "badge-approved", label: "Aprobado" }, // ← add this
   rejected:  { Icon: XCircle,    badge: "badge-rejected",     label: "Rechazado" }, // ← optional
   draft:     { Icon: XCircle,    badge: "badge-draft",     label: "Draft" },
   published: { Icon: CheckCircle, badge: "badge-published", label: "Published" },
};
