import type { ComponentType } from "react";
import App from "./App";
import { PrivacyPage, TermsPage } from "./LegalPage";
import VouchersPage from "./VouchersPage";
import WithdrawalPage from "./WithdrawalPage";

const routes: Record<string, ComponentType> = {
  "/poukazy": VouchersPage,
  "/obchodni-podminky": TermsPage,
  "/ochrana-osobnich-udaju": PrivacyPage,
  "/odstoupeni-od-smlouvy": WithdrawalPage,
};

/** Stránka podle adresy. Stejná funkce slouží v prohlížeči i při předgenerování HTML. */
export const pageFor = (path: string) => routes[path.replace(/\/+$/, "").replace(/\.html$/, "")] ?? App;
