"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet, Calendar } from "lucide-react"
import { useState } from "react"

export function ExportReports() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: string, type: string) => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would generate and download the file
    console.log(`Exporting ${type} report as ${format}`)

    setIsExporting(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2" disabled={isExporting}>
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Reports"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleExport("pdf", "monthly")}>
          <FileText className="mr-2 h-4 w-4" />
          Monthly Report (PDF)
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleExport("csv", "transactions")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Transaction Data (CSV)
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleExport("pdf", "category")}>
          <FileText className="mr-2 h-4 w-4" />
          Category Analysis (PDF)
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleExport("csv", "budget")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Budget Report (CSV)
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleExport("pdf", "annual")}>
          <Calendar className="mr-2 h-4 w-4" />
          Annual Summary (PDF)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
