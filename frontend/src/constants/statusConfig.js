// src/constants/statusConfig.js
import { CheckCircle, Clock, XCircle } from "lucide-react";

export const STATUS_CONFIG = {
  published: { Icon: CheckCircle, badge: "badge-published", label: "Published" },
  pending:   { Icon: Clock,      badge: "badge-pending",   label: "Pending" },
  draft:     { Icon: XCircle,    badge: "badge-draft",     label: "Draft" },
  approved:  { Icon: CheckCircle, badge: "badge-published", label: "Approved" }, // ← add this
  rejected:  { Icon: XCircle,    badge: "badge-draft",     label: "Rejected" }, // ← optional
};
