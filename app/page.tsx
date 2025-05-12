"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gamepad2,
  BookOpen,
  Users,
  Map,
  Palette,
  Menu,
  Moon,
  Sun,
  ChevronRight,
  Star,
  Sparkles,
  Music,
  Compass,
  Asterisk,
  CircleDot,
  Orbit,
  PenTool,
  Layers,
  LayoutGrid,
  Tablet,
  Scroll,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import RuinsAesthetics from "@/src/pages/RuinsAesthetics"
import EnvironmentDesign from "@/src/pages/EnvironmentDesign"

// Character data for optimization and single source of truth
const CHARACTERS = [
  {
    id: "carmin",
    name: "Carmin Prince",
    role: "Protagonist",
    description: "A 24-year-old prodigy archaeologist with porcelain-white skin, long crimson hair, and emerald green eyes. She's the head of the \"Logos of Arkhé\" team.",
    age: 24,
    origin: "Brazilian",
    position: "Lead Archaeologist",
    img: "/carmin.png",
  },
  {
    id: "ebony",
    name: "Ebony Ivory",
    role: "Team Doctor",
    description: "A 52-year-old Japanese doctor with graying hair and a beard. He provides medical support to the team during their expedition.",
    age: 52,
    origin: "Japanese",
    position: "Doctor",
    img: "/ebony.png",
  },
  {
    id: "violet",
    name: "Violet Addams",
    role: "IT Technician",
    description: "A 23-year-old English IT technician with violet hair and yellow eyes. He handles all the technical aspects of the expedition.",
    age: 23,
    origin: "English",
    position: "IT Technician",
    img: "/violet.png",
  },
  {
    id: "penny",
    name: "Penny Parker",
    role: "Assistant",
    description: "A 19-year-old American assistant with tanned skin and dark brown hair. The youngest member of the team, she assists with various tasks.",
    age: 19,
    origin: "American",
    position: "Assistant",
    img: "/penny.png",
  },
]

export default function Home() {
  const { setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("overview")
  const isMobile = useMobile()
  const [activeArtTab, setActiveArtTab] = useState("character")
  const [activeUITab, setActiveUITab] = useState("journal")

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const NavItem = ({ id, icon, label }: { id: string; icon: React.ReactNode; label: string }) => (
    <Button
      variant={activeSection === id ? "default" : "ghost"}
      className={`w-full justify-start gap-2 ${activeSection === id ? "btn-celestial" : ""}`}
      onClick={() => scrollToSection(id)}
    >
      <span className={activeSection === id ? "icon-glow" : ""}>{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Button>
  )

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="glass noise-texture">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 ruins-header">
            <Sparkles className="h-5 w-5 text-primary icon-glow" />
            Celesti L
          </SheetTitle>
          <SheetDescription>Game Design Document</SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-2">
          <NavItem id="overview" icon={<BookOpen className="h-5 w-5" />} label="Overview" />
          <NavItem id="gameplay" icon={<Gamepad2 className="h-5 w-5" />} label="Gameplay" />
          <NavItem id="characters" icon={<Users className="h-5 w-5" />} label="Characters" />
          <NavItem id="levels" icon={<Map className="h-5 w-5" />} label="Levels" />
          <NavItem id="art" icon={<Palette className="h-5 w-5" />} label="Art Style" />
          <NavItem id="music" icon={<Music className="h-5 w-5" />} label="Music" />
        </div>
      </SheetContent>
    </Sheet>
  )

  // Art style section components
  const ArtStyleTab = ({
    id,
    icon,
    label,
    active,
    onClick,
  }: { id: string; icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) => (
    <motion.div
      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${
        active ? "bg-primary/20 text-primary-foreground" : "hover:bg-primary/10"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon}
      <span>{label}</span>
      {active && <motion.div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" layoutId="artTabIndicator" />}
    </motion.div>
  )

  // UI design section components
  const UIDesignTab = ({
    id,
    icon,
    label,
    active,
    onClick,
  }: { id: string; icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) => (
    <motion.div
      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${
        active ? "bg-primary/20 text-primary-foreground" : "hover:bg-primary/10"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon}
      <span>{label}</span>
      {active && <motion.div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" layoutId="uiTabIndicator" />}
    </motion.div>
  )

  return (
    <div className="mesh-gradient min-h-screen">
      <header className="sticky top-0 z-50 glass noise-texture border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary icon-glow" />
              <span className="font-bold text-xl">Celesti L</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme("light")} className="hidden md:flex">
              <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme("dark")} className="hidden md:flex">
              <Moon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-6 py-8">
        <aside className="hidden md:block">
          <div className="sticky top-24 glass noise-texture rounded-lg p-4 ruin-column">
            <div className="space-y-1">
              <NavItem id="overview" icon={<BookOpen className="h-5 w-5" />} label="Overview" />
              <NavItem id="gameplay" icon={<Gamepad2 className="h-5 w-5" />} label="Gameplay" />
              <NavItem id="characters" icon={<Users className="h-5 w-5" />} label="Characters" />
              <NavItem id="levels" icon={<Map className="h-5 w-5" />} label="Levels" />
              <NavItem id="art" icon={<Palette className="h-5 w-5" />} label="Art Style" />
              <NavItem id="music" icon={<Music className="h-5 w-5" />} label="Music" />
            </div>
          </div>
        </aside>

        <main className="space-y-12">
          <section id="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass noise-texture rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4 ruins-header">
                <BookOpen className="h-6 w-6 text-primary icon-glow" />
                <h2 className="text-2xl font-bold">Game Overview</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 ancient-scroll">
                  <h3 className="text-xl font-semibold">Celesti L</h3>
                  <p>
                    A top-down puzzle game where players explore the ruins of an ancient city. The puzzles involve lost
                    knowledge about celestial bodies, requiring players to learn the lost language of this city to solve
                    them.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="badge-celestial">
                      Puzzle Game
                    </Badge>
                    <Badge variant="outline" className="badge-celestial">
                      Top-Down
                    </Badge>
                    <Badge variant="outline" className="badge-celestial">
                      PC
                    </Badge>
                    <Badge variant="outline" className="badge-celestial">
                      Indie
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 ancient-scroll">
                  <h3 className="text-xl font-semibold">Project Scope</h3>
                  <p>
                    A small indie game with few areas but good use of backtracking. Inspired by Cicada, "7 days to end
                    with you", and "A Chegada".
                  </p>

                  <h4 className="font-medium mt-4">Controls</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>WASD/Arrows</div>
                    <div>Movement</div>
                    <div>Left Stick</div>

                    <div>F</div>
                    <div>Interaction</div>
                    <div>A Button</div>

                    <div>I</div>
                    <div>In-game Menu</div>
                    <div>Y Button</div>

                    <div>ESC</div>
                    <div>Main Menu</div>
                    <div>Start Button</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="gameplay" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass noise-texture rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4 ruins-header">
                <Gamepad2 className="h-6 w-6 text-primary icon-glow" />
                <h2 className="text-2xl font-bold">Gameplay Mechanics</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Core Mechanics</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="glass noise-texture border-0 celestial-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs ancient-symbol">⚝</span>
                          Movement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Top-down movement in 4 directions, allowing the player to explore the ancient ruins.</p>
                      </CardContent>
                    </Card>

                    <Card className="glass noise-texture border-0 celestial-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs ancient-symbol">⚝</span>
                          Interaction
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Players can interact with objects in the environment, each with unique behaviors.</p>
                      </CardContent>
                    </Card>

                    <Card className="glass noise-texture border-0 celestial-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs ancient-symbol">⚝</span>
                          Mental Map
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>A menu for organizing information found throughout the game.</p>
                      </CardContent>
                    </Card>

                    <Card className="glass noise-texture border-0 celestial-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs ancient-symbol">⚝</span>
                          Object Behavior
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Objects can have constant effects like altering gravity or perform actions when interacted
                          with.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Puzzle System</h3>
                  <p className="mb-4">
                    The game features puzzles that require understanding the lost language and celestial knowledge of
                    the ancient civilization. Players must decipher symbols and patterns to progress.
                  </p>

                  <Tabs defaultValue="language">
                    <TabsList className="glass weathered">
                      <TabsTrigger value="language">Language Puzzles</TabsTrigger>
                      <TabsTrigger value="celestial">Celestial Puzzles</TabsTrigger>
                      <TabsTrigger value="environmental">Environmental Puzzles</TabsTrigger>
                    </TabsList>

                    <TabsContent value="language" className="mt-4 space-y-4">
                      <div className="glass noise-texture rounded-lg p-4 ancient-scroll">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-amber-300 text-xs">⚝</span>
                          Deciphering the Lost Language
                        </h4>
                        <p>
                          Similar to "7 days to end with you" and "Chants of Sennaar", players must learn and understand
                          an unknown language by finding patterns and context clues in the environment.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="celestial" className="mt-4 space-y-4">
                      <div className="glass noise-texture rounded-lg p-4 ancient-scroll">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-amber-300 text-xs">⚝</span>
                          Celestial Alignment
                        </h4>
                        <p>
                          Puzzles involving the alignment and position of celestial bodies. Players must understand the
                          ancient civilization's astronomical knowledge to solve these puzzles.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="environmental" className="mt-4 space-y-4">
                      <div className="glass noise-texture rounded-lg p-4 ancient-scroll">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-amber-300 text-xs">⚝</span>
                          Gravity Manipulation
                        </h4>
                        <p>
                          Some objects in the ruins affect gravity in their vicinity. Players must use these effects to
                          their advantage to solve puzzles and access new areas.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="characters" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass noise-texture rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4 ruins-header">
                <Users className="h-6 w-6 text-primary icon-glow" />
                <h2 className="text-2xl font-bold">Characters</h2>
              </div>

              <p className="mb-6 ancient-scroll p-4">
                The "Logos of Arkhé" archaeological team has been assigned to investigate the newly discovered ruins.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {CHARACTERS.map((char, idx) => (
                  <motion.div
                    key={char.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="character-card glass noise-texture border-0 overflow-hidden celestial-glow">
                      <div className="relative h-60">
                        <Image
                          src={char.img}
                          alt={char.name}
                          width={400}
                          height={240}
                          layout="responsive"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs">⚝</span>
                          {char.name}
                        </CardTitle>
                        <CardDescription>
                          {char.position}, {char.age}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{char.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                          <div className="font-medium">Age</div>
                          <div>{char.age}</div>
                          <div className="font-medium">Origin</div>
                          <div>{char.origin}</div>
                          <div className="font-medium">Role</div>
                          <div>{char.position}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="levels" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass noise-texture rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4 ruins-header">
                <Map className="h-6 w-6 text-primary icon-glow" />
                <h2 className="text-2xl font-bold">Levels & World</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Ancient Ruins</h3>
                  <p className="mb-4 ancient-scroll p-4">
                    The game takes place in the ruins of an ancient city that studied celestial bodies and developed
                    strange technology that was lost over time. The ruins were recently discovered in 2025.
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="glass noise-texture border-0 celestial-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs">⚝</span>
                          Observatory
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          The central area where the ancient civilization studied the stars and planets. Contains the
                          most complex puzzles related to celestial alignment.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass noise-texture border-0 celestial-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs">⚝</span>
                          Library
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Contains scrolls and tablets with the lost language. Players will find most of the language
                          clues here to help decipher the ancient texts.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass noise-texture border-0 celestial-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-amber-300 text-xs">⚝</span>
                          Laboratory
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Where the ancient civilization developed their gravity-altering technology. Features puzzles
                          that involve manipulating gravity to progress.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">World Mechanics</h3>
                  <p className="mb-4 ancient-scroll p-4">
                    As the team studies the ruins, they discover that gravity behaves differently around certain
                    objects. This strange technology is central to both the story and gameplay mechanics.
                  </p>

                  <div className="glass noise-texture rounded-lg p-4 weathered">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Compass className="h-4 w-4 text-amber-300" />
                      Gravity Anomalies
                    </h4>
                    <p>
                      Certain artifacts in the ruins emit fields that alter gravity in their vicinity. Players must
                      learn to use these effects to their advantage to solve puzzles and access new areas.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-purple-500 glow-effect"></div>
                        <span>Reduced gravity zones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-blue-500 glow-effect"></div>
                        <span>Increased gravity zones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-green-500 glow-effect"></div>
                        <span>Directional gravity zones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-yellow-500 glow-effect"></div>
                        <span>Gravity nullification zones</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="art" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass noise-texture rounded-lg p-6 md:p-8 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 ruins-header">
                  <Palette className="h-6 w-6 text-primary icon-glow" />
                  <h2 className="text-2xl font-bold">Art Style</h2>
                </div>

                <motion.div
                  className="mb-8 ancient-scroll p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-lg">
                    The game features a watercolor art style that creates a dreamlike atmosphere, enhancing the
                    mysterious nature of the ancient ruins. The visual design blends celestial elements with weathered
                    ruins aesthetics.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass noise-texture rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 ruins-header">Visual Elements</h3>
                    <div className="space-y-2">
                      <ArtStyleTab
                        id="character"
                        icon={<Users className="h-5 w-5" />}
                        label="Character Design"
                        active={activeArtTab === "character"}
                        onClick={() => setActiveArtTab("character")}
                      />
                      <ArtStyleTab
                        id="environment"
                        icon={<Layers className="h-5 w-5" />}
                        label="Environment Design"
                        active={activeArtTab === "environment"}
                        onClick={() => setActiveArtTab("environment")}
                      />
                      <ArtStyleTab
                        id="celestial"
                        icon={<Orbit className="h-5 w-5" />}
                        label="Celestial Elements"
                        active={activeArtTab === "celestial"}
                        onClick={() => setActiveArtTab("celestial")}
                      />
                      <ArtStyleTab
                        id="ruins"
                        icon={<Asterisk className="h-5 w-5" />}
                        label="Ruins Aesthetics"
                        active={activeArtTab === "ruins"}
                        onClick={() => setActiveArtTab("ruins")}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <AnimatePresence mode="wait">
                      {activeArtTab === "character" && (
                        <motion.div
                          key="character"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <PenTool className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">Character Design</h3>
                          </div>

                          <p className="mb-4">
                            Characters are illustrated in a watercolor style with soft edges and muted colors. Each
                            character has a distinct color palette that reflects their personality and role in the
                            story.
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-full bg-red-400 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-300 to-red-500 opacity-80"></div>
                                <div className="absolute inset-0 watercolor-texture"></div>
                              </div>
                              <span className="text-sm">Carmin</span>
                            </motion.div>

                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-full bg-purple-400 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 opacity-80"></div>
                                <div className="absolute inset-0 watercolor-texture"></div>
                              </div>
                              <span className="text-sm">Violet</span>
                            </motion.div>

                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-full bg-slate-100 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 opacity-80"></div>
                                <div className="absolute inset-0 watercolor-texture"></div>
                              </div>
                              <span className="text-sm">Ebony</span>
                            </motion.div>

                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-full bg-amber-800 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 opacity-80"></div>
                                <div className="absolute inset-0 watercolor-texture"></div>
                              </div>
                              <span className="text-sm">Penny</span>
                            </motion.div>
                          </div>

                          <div className="mt-6 p-4 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                            <h4 className="font-medium mb-2">Character Art Style Notes</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Soft watercolor edges with visible brush strokes</li>
                              <li>Distinct color palettes for each character</li>
                              <li>Semi-realistic proportions with stylized features</li>
                              <li>Emphasis on expressive eyes and distinctive silhouettes</li>
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      {activeArtTab === "environment" && (
                        <motion.div
                          key="environment"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Layers className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">Environment Design</h3>
                          </div>

                          <p className="mb-4">
                            The ruins feature a blend of ancient architecture and mysterious technology. The environment
                            uses a muted color palette with occasional glowing elements to highlight important objects
                            and areas.
                          </p>

                          <div className="relative h-40 rounded-lg overflow-hidden mb-6">
                            <div className="absolute inset-0 ruins-environment-preview"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                              <EnvironmentDesign>
                                <div className="p-3">
                                  <span className="text-sm font-medium">Observatory Concept Art</span>
                                </div>
                              </EnvironmentDesign>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-lg bg-stone-400 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-stone-300 to-stone-500 opacity-80"></div>
                                <div className="absolute inset-0 ruins-texture"></div>
                              </div>
                              <span className="text-sm">Stone</span>
                            </motion.div>

                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-lg bg-slate-400 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-500 opacity-80"></div>
                                <div className="absolute inset-0 ruins-texture"></div>
                              </div>
                              <span className="text-sm">Marble</span>
                            </motion.div>

                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-lg bg-cyan-400 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-cyan-500 opacity-80"></div>
                                <div className="absolute inset-0 energy-texture"></div>
                              </div>
                              <span className="text-sm">Energy</span>
                            </motion.div>

                            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05, y: -5 }}>
                              <div className="h-16 w-16 rounded-lg bg-amber-300 celestial-glow mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-400 opacity-80"></div>
                                <div className="absolute inset-0 metal-texture"></div>
                              </div>
                              <span className="text-sm">Metal</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {activeArtTab === "celestial" && (
                        <motion.div
                          key="celestial"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Orbit className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">Celestial Elements</h3>
                          </div>

                          <p className="mb-4">
                            Celestial bodies play a crucial role in both the game's story and visual design. Stars,
                            planets, and cosmic phenomena are represented with a mix of scientific accuracy and artistic
                            interpretation.
                          </p>

                          <div className="relative h-40 rounded-lg overflow-hidden mb-6">
                            <div className="absolute inset-0 celestial-preview"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                className="h-20 w-20 rounded-full bg-blue-500 celestial-glow relative"
                                animate={{
                                  boxShadow: [
                                    "0 0 20px rgba(59, 130, 246, 0.5)",
                                    "0 0 40px rgba(59, 130, 246, 0.7)",
                                    "0 0 20px rgba(59, 130, 246, 0.5)",
                                  ],
                                }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                              >
                                <motion.div
                                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-cyan-300"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                ></motion.div>
                              </motion.div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <CircleDot className="h-4 w-4 text-amber-300" />
                                Celestial Bodies
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Planets with unique color schemes</li>
                                <li>Stars with varying brightness and colors</li>
                                <li>Nebulae with watercolor-like gradients</li>
                                <li>Constellations forming ancient symbols</li>
                              </ul>
                            </div>

                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Asterisk className="h-4 w-4 text-amber-300" />
                                Cosmic Phenomena
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Aurora-like energy fields</li>
                                <li>Gravitational distortion effects</li>
                                <li>Cosmic dust and particle effects</li>
                                <li>Light refraction through crystals</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeArtTab === "ruins" && (
                        <motion.div
                          key="ruins"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Asterisk className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">Ruins Aesthetics</h3>
                          </div>

                          <p className="mb-4">
                            The ancient ruins combine weathered stone architecture with mysterious technological
                            elements. The design draws inspiration from various ancient civilizations while maintaining
                            a unique aesthetic.
                          </p>

                          <div className="relative h-40 rounded-lg overflow-hidden mb-6">
                            <div className="absolute inset-0 ruins-preview"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <RuinsAesthetics>
                              <div className="p-3">
                                <span className="text-sm font-medium">Ancient Observatory Interior</span>
                              </div>
                            </RuinsAesthetics>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Layers className="h-4 w-4 text-amber-300" />
                                Architectural Elements
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Weathered stone columns and arches</li>
                                <li>Intricate carvings depicting celestial events</li>
                                <li>Partially collapsed structures</li>
                                <li>Ancient observatories with precise alignments</li>
                              </ul>
                            </div>

                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <CircleDot className="h-4 w-4 text-amber-300" />
                                Technological Elements
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Mysterious devices with glowing components</li>
                                <li>Gravity-altering mechanisms</li>
                                <li>Ancient astronomical instruments</li>
                                <li>Crystal-powered technology</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="ui" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass noise-texture rounded-lg p-6 md:p-8 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 ruins-header">
                  <LayoutGrid className="h-6 w-6 text-primary icon-glow" />
                  <h2 className="text-2xl font-bold">UI Design</h2>
                </div>

                <motion.div
                  className="mb-8 ancient-scroll p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-lg">
                    The user interface follows a minimalist design with elements that reflect the ancient civilization's
                    aesthetic. The UI incorporates celestial symbols and the lost language, creating an immersive
                    experience that blends gameplay with narrative elements.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass noise-texture rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 ruins-header">Interface Elements</h3>
                    <div className="space-y-2">
                      <UIDesignTab
                        id="journal"
                        icon={<Scroll className="h-5 w-5" />}
                        label="Language Journal"
                        active={activeUITab === "journal"}
                        onClick={() => setActiveUITab("journal")}
                      />
                      <UIDesignTab
                        id="map"
                        icon={<Map className="h-5 w-5" />}
                        label="Mental Map"
                        active={activeUITab === "map"}
                        onClick={() => setActiveUITab("map")}
                      />
                      <UIDesignTab
                        id="hud"
                        icon={<Tablet className="h-5 w-5" />}
                        label="HUD Elements"
                        active={activeUITab === "hud"}
                        onClick={() => setActiveUITab("hud")}
                      />
                      <UIDesignTab
                        id="menus"
                        icon={<LayoutGrid className="h-5 w-5" />}
                        label="Menu Design"
                        active={activeUITab === "menus"}
                        onClick={() => setActiveUITab("menus")}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <AnimatePresence mode="wait">
                      {activeUITab === "journal" && (
                        <motion.div
                          key="journal"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Scroll className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">Language Journal</h3>
                          </div>

                          <p className="mb-4">
                            The player's journal for tracking discovered language symbols features a parchment-like
                            background with watercolor illustrations. As players discover new symbols, they can organize
                            them in this journal to help solve puzzles.
                          </p>

                          <div className="relative h-48 rounded-lg overflow-hidden mb-6 ancient-scroll">
                            <div className="grid grid-cols-4 gap-2 p-4">
                              {[...Array(12)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`aspect-square rounded-lg ${i < 5 ? "bg-amber-950/30" : "bg-amber-950/10"} flex items-center justify-center`}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {i < 5 && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                    >
                                      <Star className={`h-6 w-6 text-amber-300`} />
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/30 to-transparent">
                              <div className="text-sm text-center">5/12 symbols discovered</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Scroll className="h-4 w-4 text-amber-300" />
                                Journal Features
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Drag and drop organization of symbols</li>
                                <li>Notes section for player theories</li>
                                <li>Context clues for each discovered symbol</li>
                                <li>Visual connections between related symbols</li>
                              </ul>
                            </div>

                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <PenTool className="h-4 w-4 text-amber-300" />
                                Visual Design
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Aged parchment texture background</li>
                                <li>Ink and watercolor visual effects</li>
                                <li>Subtle animations when organizing symbols</li>
                                <li>Celestial-themed decorative elements</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeUITab === "map" && (
                        <motion.div
                          key="map"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Map className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">Mental Map</h3>
                          </div>

                          <p className="mb-4">
                            The mental map helps players organize their thoughts and discoveries about the ruins. It
                            visualizes connections between locations, characters, and puzzle elements in an intuitive
                            way.
                          </p>

                          <div className="relative h-48 rounded-lg overflow-hidden mb-6 bg-black/20">
                            <div className="absolute inset-0 mental-map-preview"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                className="h-16 w-16 rounded-full bg-amber-500/30 backdrop-blur-sm flex items-center justify-center"
                                animate={{
                                  boxShadow: [
                                    "0 0 10px rgba(245, 158, 11, 0.3)",
                                    "0 0 20px rgba(245, 158, 11, 0.5)",
                                    "0 0 10px rgba(245, 158, 11, 0.3)",
                                  ],
                                }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                              >
                                <Compass className="h-8 w-8 text-amber-300" />
                              </motion.div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Map className="h-4 w-4 text-amber-300" />
                                Map Features
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Interactive node-based connection system</li>
                                <li>Color-coded locations and puzzle types</li>
                                <li>Animated pathways between connected elements</li>
                                <li>Zoom and pan navigation</li>
                              </ul>
                            </div>

                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Layers className="h-4 w-4 text-amber-300" />
                                Visual Design
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Constellation-inspired connection lines</li>
                                <li>Subtle particle effects for active nodes</li>
                                <li>Minimalist iconography for different elements</li>
                                <li>Animated transitions between map states</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeUITab === "hud" && (
                        <motion.div
                          key="hud"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Tablet className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">HUD Elements</h3>
                          </div>

                          <p className="mb-4">
                            The heads-up display is minimalist and unobtrusive, showing only essential information to
                            maintain immersion. Elements appear and fade contextually based on the player's actions and
                            environment.
                          </p>

                          <div className="relative h-48 rounded-lg overflow-hidden mb-6 bg-black/20">
                            <div className="absolute inset-0 hud-preview"></div>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                              <motion.div
                                className="glass noise-texture px-3 py-1 rounded-full flex items-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                              >
                                <Compass className="h-4 w-4 text-amber-300" />
                                <span className="text-sm">Observatory</span>
                              </motion.div>

                              <motion.div
                                className="glass noise-texture px-3 py-1 rounded-full flex items-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                              >
                                <Scroll className="h-4 w-4 text-amber-300" />
                                <span className="text-sm">5/12</span>
                              </motion.div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Tablet className="h-4 w-4 text-amber-300" />
                                HUD Features
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Context-sensitive interaction prompts</li>
                                <li>Current location indicator</li>
                                <li>Symbol collection progress</li>
                                <li>Subtle gravity field indicators</li>
                              </ul>
                            </div>

                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <CircleDot className="h-4 w-4 text-amber-300" />
                                Visual Design
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Glassmorphic UI elements with subtle blur</li>
                                <li>Smooth fade in/out transitions</li>
                                <li>Ancient symbols for status indicators</li>
                                <li>Minimal use of text for immersion</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeUITab === "menus" && (
                        <motion.div
                          key="menus"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="glass noise-texture rounded-lg p-6 h-full backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <LayoutGrid className="h-5 w-5 text-amber-300" />
                            <h3 className="text-xl font-semibold">Menu Design</h3>
                          </div>

                          <p className="mb-4">
                            Game menus blend functionality with the game's aesthetic, featuring celestial animations and
                            ancient ruin motifs. The design maintains consistency with the overall visual language of
                            the game.
                          </p>

                          <div className="relative h-48 rounded-lg overflow-hidden mb-6 bg-black/20">
                            <div className="absolute inset-0 menu-preview"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="glass noise-texture p-4 rounded-lg backdrop-blur-md w-64">
                                <h4 className="text-center font-medium mb-4 ruins-header">CELESTI L</h4>
                                <div className="space-y-2">
                                  {["Continue", "New Game", "Options", "Credits"].map((item, i) => (
                                    <motion.div
                                      key={i}
                                      className="p-2 text-center rounded-lg hover:bg-white/10 cursor-pointer"
                                      whileHover={{ x: 5 }}
                                    >
                                      {item}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <LayoutGrid className="h-4 w-4 text-amber-300" />
                                Menu Features
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Smooth transitions between menu screens</li>
                                <li>Parallax background effects</li>
                                <li>Subtle ambient animations</li>
                                <li>Responsive layout for different screens</li>
                              </ul>
                            </div>

                            <div className="p-3 bg-black/20 rounded-lg backdrop-blur-sm noise-texture">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Asterisk className="h-4 w-4 text-amber-300" />
                                Visual Design
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Glassmorphic panels with ruins-inspired borders</li>
                                <li>Celestial particle effects in backgrounds</li>
                                <li>Ancient language decorative elements</li>
                                <li>Consistent typography with the game world</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="music" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass noise-texture rounded-lg p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4 ruins-header">
                <Music className="h-6 w-6 text-primary icon-glow" />
                <h2 className="text-2xl font-bold">Music & Soundtrack</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Game Soundtrack</h3>
                  <p className="mb-4 ancient-scroll p-4">
                    The atmospheric soundtrack enhances the mysterious and contemplative nature of the game, featuring
                    ambient sounds and ethereal melodies that complement the ancient ruins setting.
                  </p>

                  <div className="spotify-embed rounded-lg overflow-hidden glass noise-texture celestial-glow">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0yRE7ISGjTX23rBN9QkBKQ?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
                      }}
                    />
                  </div>
                </div>

                <div className="section-divider"></div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Sound Design</h3>
                  <p className="ancient-scroll p-4">
                    The game features a rich soundscape that reacts to player actions and environmental changes. Special
                    attention is given to the sounds of the gravity-altering technology, creating a unique audio
                    experience that helps players identify different types of gravity zones.
                  </p>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="glass noise-texture rounded-lg p-4 weathered">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-amber-300 text-xs">⚝</span>
                        Environmental Sounds
                      </h4>
                      <p>
                        Each area of the ruins has its own ambient sound profile, from the echoing halls of the
                        observatory to the whispered winds of the ancient library.
                      </p>
                    </div>

                    <div className="glass noise-texture rounded-lg p-4 weathered">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-amber-300 text-xs">⚝</span>
                        Interactive Audio
                      </h4>
                      <p>
                        Objects that can be interacted with provide audio feedback, with special sounds for successful
                        puzzle solutions and discoveries of new language elements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>

      <footer className="glass noise-texture border-t mt-12">
        <div className="container py-6 md:py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary icon-glow" />
              <span className="font-semibold">Celesti L</span>
              <span className="text-sm text-muted-foreground">Game Design Document</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">© The Infinity Works, 2025</div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            We do not agree with the monetary use of AI-generated images. All art was generated with AI only because we did not have an available artist.
          </div>
        </div>
      </footer>
    </div>
  )
}
