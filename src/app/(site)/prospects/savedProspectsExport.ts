import {
  formatEmailBody,
  getRecommendedEmail,
  getSecondaryEmails,
} from "../prospect/[id]/prospectFormat";
import type { ProspectRecord } from "../prospect/[id]/prospectTypes";

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailText(
  subject: string | undefined,
  body: string | undefined,
  prospect: ProspectRecord,
  userName: string,
) {
  return [subject || "", ...formatEmailBody(body || "", prospect, userName)]
    .filter(Boolean)
    .join("\n\n");
}

function flattenProspect(prospect: ProspectRecord, userName: string) {
  const recommended = getRecommendedEmail(prospect);
  const secondary = getSecondaryEmails(prospect);
  const followUps = prospect.outreach_angles?.follow_ups?.emails || [];

  return {
    goal: prospect.recommended_outreach_goal || "",
    outreachAngle: prospect.recommended_outreach_angle || "",
    recommendedEmail: recommended
      ? buildEmailText(
          recommended.variations?.[0]?.subject,
          recommended.variations?.[0]?.body,
          prospect,
          userName,
        )
      : "",
    secondaryEmail1: secondary[0]
      ? buildEmailText(
          secondary[0].variations?.[0]?.subject,
          secondary[0].variations?.[0]?.body,
          prospect,
          userName,
        )
      : "",
    secondaryEmail2: secondary[1]
      ? buildEmailText(
          secondary[1].variations?.[0]?.subject,
          secondary[1].variations?.[0]?.body,
          prospect,
          userName,
        )
      : "",
    followUp1: followUps[0] ? buildEmailText(followUps[0].subject, followUps[0].body, prospect, userName) : "",
    followUp2: followUps[1] ? buildEmailText(followUps[1].subject, followUps[1].body, prospect, userName) : "",
    followUp3: followUps[2] ? buildEmailText(followUps[2].subject, followUps[2].body, prospect, userName) : "",
    title: prospect.title || "",
    whatTheyDo: prospect.what_they_do || "",
    overview: prospect.description || "",
    valueProposition: prospect.value_proposition || "",
    targetCustomer: prospect.target_customer || "",
    readiness: String(prospect.sales_readiness_score || ""),
    bestPersona: prospect.best_sales_persona || "",
    url: prospect.url || "",
    domain: prospect.domain || "",
    status: prospect.prospect_status || "",
    savedAt: prospect.created_at || "",
  };
}

const HEADERS = [
  "Goal",
  "Outreach Angle",
  "Recommended Email",
  "Secondary Email 1",
  "Secondary Email 2",
  "Follow-Up 1",
  "Follow-Up 2",
  "Follow-Up 3",
  "Title",
  "What They Do",
  "Company Overview",
  "Value Proposition",
  "Target Customer",
  "Sales Readiness",
  "Best Persona Recommendation",
  "URL",
  "Domain",
  "Prospect Status",
  "Saved At",
];

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportSavedProspectsToCSV(rows: ProspectRecord[], userName: string) {
  const flattened = rows.map((row) => flattenProspect(row, userName));
  const body = flattened.map((row) =>
    [
      row.goal,
      row.outreachAngle,
      row.recommendedEmail,
      row.secondaryEmail1,
      row.secondaryEmail2,
      row.followUp1,
      row.followUp2,
      row.followUp3,
      row.title,
      row.whatTheyDo,
      row.overview,
      row.valueProposition,
      row.targetCustomer,
      row.readiness,
      row.bestPersona,
      row.url,
      row.domain,
      row.status,
      row.savedAt,
    ]
      .map(escapeCsv)
      .join(","),
  );

  downloadBlob(
    new Blob([[HEADERS.map(escapeCsv).join(","), ...body].join("\n")], {
      type: "text/csv;charset=utf-8",
    }),
    "signalizeai_saved_prospects.csv",
  );
}

export function exportSavedProspectsToExcel(rows: ProspectRecord[], userName: string) {
  const flattened = rows.map((row) => flattenProspect(row, userName));
  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="utf-8" /></head>
      <body>
        <table>
          <tr>${HEADERS.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
          ${flattened
            .map(
              (row) => `
                <tr>
                  <td style="white-space:pre-wrap">${escapeHtml(row.goal)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.outreachAngle)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.recommendedEmail)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.secondaryEmail1)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.secondaryEmail2)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.followUp1)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.followUp2)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.followUp3)}</td>
                  <td>${escapeHtml(row.title)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.whatTheyDo)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.overview)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.valueProposition)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.targetCustomer)}</td>
                  <td>${escapeHtml(row.readiness)}</td>
                  <td style="white-space:pre-wrap">${escapeHtml(row.bestPersona)}</td>
                  <td>${escapeHtml(row.url)}</td>
                  <td>${escapeHtml(row.domain)}</td>
                  <td>${escapeHtml(row.status)}</td>
                  <td>${escapeHtml(row.savedAt)}</td>
                </tr>`,
            )
            .join("")}
        </table>
      </body>
    </html>
  `;

  downloadBlob(
    new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" }),
    "signalizeai_saved_prospects.xls",
  );
}
