"use client";

import type React from "react";
import { useEffect, useState } from "react";
import "./app.css";
import resultImage from "../images/result.jpg";
import orbImage from "../images/orb.jpg";
import droidImage from "../images/droid.jpg";
import graphImage from "../images/graph.jpg";
import lsdImage from "../images/lsd.jpg";
// import simVideo from "../images/test4.mp4";

import { MathJax, MathJaxContext } from "better-react-mathjax";

// Define the section types
interface Section {
  id: string;
  title: string;
  subsections?: Section[];
}

const config = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
    processEscapes: true,
  },
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("abstract");

  // Define all sections with their IDs
  const sections: Section[] = [
    { id: "abstract", title: "1. Abstract" },
    {
      id: "introduction",
      title: "2. Introduction",
      subsections: [
        { id: "introduction-1", title: "2.1 Background" },
        { id: "introduction-2", title: "2.2 SLAM" },
        {
          id: "introduction-3",
          title: "2.3 Autonomous Drones and their Challenges",
        },
        { id: "introduction-4", title: "2.4 Significance" },
      ],
    },
    {
      id: "literature",
      title: "3. Literature Review / Related Work",
      subsections: [
        { id: "literature-1", title: "3.1 Evolution of SLAM" },
        { id: "literature-2", title: "3.2 Recent Advances" },
        { id: "literature-3", title: "3.3 SLAM for Aerial Robotics" },
        { id: "literature-4", title: "3.4 Dataset and Simulations" },
      ],
    },
    {
      id: "slam",
      title: "4. SLAM Algorithms and KITTI Dataset",
      subsections: [
        { id: "slam-1", title: "4.1 ORB SLAM" },
        { id: "slam-2", title: "4.2 Graph-Based Optimized SLAM" },
        { id: "slam-3", title: "4.3 DROID SLAM" },
        { id: "slam-4", title: "4.4 LSD SLAM" },
        { id: "slam-5", title: "4.5 KITTI Dataset" },
      ],
    },
    {
      id: "methodology",
      title: "5. Methodology & Implementation",
      subsections: [
        { id: "methodology-1", title: "5.1 SLAM" },
        { id: "methodology-2", title: "5.2 Dataset Benchmarking" },
        { id: "methodology-3", title: "5.3 WEBOTS Simulation" },
        { id: "methodology-4", title: "5.4 Analysis Techniques" },
      ],
    },
    {
      id: "results",
      title: "6. Results and Discussion",
      subsections: [
        { id: "results-1", title: "6.1 ORB SLAM" },
        { id: "results-2", title: "6.2 Graph based Optimized SLAM" },
        { id: "results-3", title: "6.3 DROID SLAM" },
        { id: "results-4", title: "6.4 LSD SLAM" },
      ],
    },
    { id: "demo", title: "7. Demo of Simulation" },
    { id: "conclusion", title: "8. Conclusion and Future Work" },
    { id: "references", title: "9. References" },
  ];

  // Handle scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Find the current section in view
      const allSections = sections.flatMap((section) =>
        section.subsections ? [section, ...section.subsections] : [section]
      );

      for (let i = allSections.length - 1; i >= 0; i--) {
        const section = allSections[i];
        const element = document.getElementById(section.id);

        if (element && element.offsetTop <= scrollPosition + 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Render table of contents
  const renderTOC = (items: Section[], level = 0) => {
    return (
      <ul className={`toc-list ${level > 0 ? "pl-4" : ""}`}>
        {items.map((section) => (
          <li key={section.id}>
            <button
              className={`toc-item ${
                activeSection === section.id ? "active" : ""
              }`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </button>
            {section.subsections && renderTOC(section.subsections, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  const MathComponent: React.FC = () => {
    return (
      <MathJaxContext config={config}>
        <div className="math-content">
          <MathJax>
            {"$I(p_i) > I(p) + t \\text{ or } I(p_i) < I(p) - t$"}
          </MathJax>
        </div>
      </MathJaxContext>
    );
  };

  // Render content sections
  const renderContent = () => {
    return (
      <div className="content">
        <div className="page-header">
          <h1
            style={{
              fontSize: "2.2rem",
              marginBottom: "2rem",
              color: "var(--primary-color)",
              textAlign: "center",
            }}
          >
            Comparitive Study of SLAM Algorithms for Drone Navigation
          </h1>
        </div>

        <section id="abstract" className="section">
          <h2>1. Abstract</h2>
          <p>
            Simultaneous Localization and Mapping (SLAM) has emerged as a
            foundational technology for enabling autonomous navigation in
            robotics. This project explores the implementation and benchmarking
            of various SLAM algorithms in the context of autonomous drone
            navigation. The goal is to evaluate how different SLAM methods
            perform when mapping and navigating through complex, feature-rich
            environments using a drone platform. Four SLAM
            algorithms—DROID-SLAM, Graph-Based SLAM, ORB-SLAM, and LSD-SLAM—have
            been applied and tested using the KITTI dataset, which provides
            real-world-like sensor data.
          </p>
          <p>
            In parallel, a realistic drone simulation environment has been
            developed in Webots, allowing for the generation of custom image and
            pose datasets via a controllable drone equipped with a front-facing
            camera and range sensor. This synthetic environment replicates
            indoor navigation challenges, serving as a testing ground for
            SLAM-based mapping. Although a fully autonomous drone navigation
            pipeline within the Webots environment has not been achieved yet,
            the current setup provides a complete simulation-to-SLAM data
            pipeline. The final objective is to build a comprehensive
            understanding of the performance, limitations, and adaptability of
            SLAM methods in dynamic drone-based scenarios, paving the way for
            real-time autonomous aerial mapping systems.
          </p>
        </section>
        <br />
        <section id="introduction" className="section">
          <h2>2. Introduction</h2>
          <section id="introduction-1" className="subsection">
            <h3>2.1 Background</h3>
            <p>
              Over the past decade, autonomous robotic systems have become
              increasingly prominent in both research and real-world
              applications. From ground-based service robots to aerial unmanned
              vehicles, the goal of achieving full autonomy—where a robot can
              perceive, reason, plan, and act without human guidance—has become
              a central focus of the robotics community. Among these autonomous
              platforms, drones, or unmanned aerial vehicles (UAVs), have
              attracted significant interest due to their versatility, agility,
              and ability to operate in three-dimensional environments.{" "}
            </p>
            <p>
              Drones are particularly useful in scenarios where human presence
              is impractical or dangerous, such as in disaster response,
              infrastructure inspection, search and rescue operations, or indoor
              navigation. However, achieving autonomy in drones is considerably
              more complex than for their ground-based counterparts. Drones must
              operate under highly dynamic conditions, manage unstable flight
              dynamics, and make fast decisions while dealing with limited
              onboard computation and energy resources. A foundational
              requirement for autonomy in such scenarios is the ability to
              localize the drone and map its environment in real-time—without
              relying on external systems like GPS. This is where Simultaneous
              Localization and Mapping (SLAM) plays a pivotal role.{" "}
            </p>
          </section>
          <br />
          <section id="introduction-2" className="subsection">
            <h3>2.2 SLAM</h3>
            <p>
              SLAM, or Simultaneous Localization and Mapping, is a computational
              problem and framework wherein a mobile robot (or drone) builds a
              map of an unknown environment while simultaneously determining its
              location within that map. The challenge in SLAM arises from the
              fact that mapping and localization are interdependent: to know
              where it is, the robot needs a map; to build the map, it needs to
              know where it is. SLAM algorithms resolve this chicken-and-egg
              problem by iteratively estimating both the environment and the
              robot's trajectory using sensor data.{" "}
            </p>
            <p>
              Typically, SLAM systems integrate data from visual sensors (e.g.,
              monocular or stereo cameras), range sensors (LiDAR, sonar), and
              inertial measurement units (IMUs). Based on this sensor fusion,
              the system identifies landmarks in the environment and
              continuously updates the map as the robot moves. Over time, SLAM
              systems use optimization and filtering techniques—such as Extended
              Kalman Filters, Particle Filters, or Graph Optimization—to refine
              both the map and the pose estimates, even in the presence of noise
              and uncertainty.{" "}
            </p>
            <br />
            <p>
              There are several categories of SLAM:
              <li>
                <strong>Visual SLAM (V-SLAM):</strong> Uses camera inputs for
                feature extraction and motion estimation.
              </li>
              <li>
                <strong>Lidar-based SLAM:</strong> Uses laser range finders for
                accurate distance measurements.
              </li>
              <li>
                <strong>RGB-D SLAM:</strong> Combines color and depth data for
                richer scene representation.
              </li>
              <li>
                <strong>Direct SLAM vs. Feature-Based SLAM: </strong>
                Direct SLAM uses pixel intensities directly, whereas
                feature-based SLAM relies on detecting and tracking key points.
              </li>{" "}
            </p>
            <p>
              SLAM is an enabling technology not only for indoor drones but also
              for autonomous cars, service robots, and augmented reality (AR)
              systems. It remains a highly active area of research due to its
              complexity and wide range of real-world applications.{" "}
            </p>
          </section>
          <br />
          <section id="introduction-3" className="subsection">
            <h3>2.3 Autonomous Drones and their Challenges</h3>
            <p>
              Drones operating autonomously in real-world environments face a
              unique set of challenges:{" "}
            </p>
            <p>
              <li>
                <strong>Stability and Control:</strong> Drones must constantly
                adjust their rotors to maintain balance, making them sensitive
                to disturbances like wind or sudden changes in motion.
              </li>
              <li>
                <strong>3D Motion:</strong> Unlike ground robots constrained to
                2D navigation, drones navigate in 3D space, increasing the
                complexity of path planning and collision avoidance.
              </li>
              <li>
                <strong>Limited Payload:</strong> Onboard computation and sensor
                choices are limited by weight and power constraints.
              </li>
              <li>
                <strong>Sensor Noise and Drift:</strong> Especially in low-light
                or featureless environments, visual sensors may produce noisy or
                ambiguous data.
              </li>
              <li>
                <strong>Fast Dynamics:</strong> Drones often move quickly,
                requiring SLAM systems to operate in real-time with low latency.
              </li>
            </p>
            <p>
              Despite these challenges, drones hold massive potential for
              autonomous tasks. Their ability to fly over obstacles, inspect
              vertical surfaces, and access hard-to-reach areas makes them ideal
              candidates for indoor and GPS-denied navigation scenarios.{" "}
            </p>
          </section>
          <br />
          <section id="introduction-4" className="subsection">
            <h3>2.4 Significance</h3>
            <p>
              This project, titled "Autonomous Drone Navigation using SLAM",
              explores how modern SLAM algorithms can be leveraged to enable
              autonomous navigation for drones in unknown, GPS-denied
              environments. The project addresses two key goals:{" "}
            </p>
            <p>
              <li>
                <strong>SLAM Algorithm Evaluation: </strong>
                Benchmarking and comparing popular SLAM methods on pre-recorded
                datasets to understand their strengths and weaknesses in aerial
                contexts.{" "}
              </li>
              <li>
                <strong>Simulation-Based SLAM Testing: </strong>
                Creating a simulated indoor environment using Webots where a
                drone can be manually controlled or semi-autonomously navigated.
                The simulator outputs real-time image streams and pose data to
                test SLAM pipelines under realistic conditions.
              </li>
            </p>
            <p>
              The ultimate motivation is to bridge the gap between SLAM theory
              and practical drone autonomy. While SLAM is widely studied in
              research papers, real-world deployment—especially on
              drones—requires handling many integration issues, including sensor
              synchronization, environmental noise, dynamic objects, and
              real-time performance. Through simulation and experimentation,
              this project lays the groundwork for full autonomy in future drone
              systems.{" "}
            </p>
          </section>
        </section>
        <br />
        <section id="literature" className="section">
          <h2>3. Literature Review / Related Work</h2>
          <p>
            Over the past decade, SLAM has evolved from a theoretical concept
            into a practical tool used in a variety of robotic applications. The
            development of SLAM algorithms has been influenced by advancements
            in computer vision, probabilistic robotics, and optimization
            techniques.
          </p>
          <br />
          <section id="literature-1" className="subsection">
            <h3>3.1 Evolution of SLAM</h3>
            <p>
              Early SLAM systems such as EKF-SLAM (Extended Kalman Filter)
              relied heavily on probabilistic models and linear approximations.
              These approaches worked reasonably well for small-scale,
              structured environments but struggled with scalability and data
              association in large or complex areas.{" "}
            </p>
            <p>
              With the rise of computational power and visual sensors, Visual
              SLAM (V-SLAM) gained prominence. Algorithms like PTAM (Parallel
              Tracking and Mapping) introduced real-time visual mapping, leading
              to more efficient tracking and map construction. ORB-SLAM further
              refined this paradigm by introducing ORB (Oriented FAST and
              Rotated BRIEF) features, enabling robust loop closure and
              relocalization.{" "}
            </p>
          </section>
          <br />
          <section id="literature-2" className="subsection">
            <h3>3.2 Recent Advances</h3>
            <p>
              In recent years, learning-based and direct methods have begun to
              outperform classical techniques in many scenarios. DROID-SLAM
              (Deep Visual Odometry and Implicit Mapping) integrates learned
              visual odometry with real-time feature tracking and mapping,
              offering high robustness in low-feature environments. Meanwhile,
              LSD-SLAM utilizes direct image alignment without relying on
              feature extraction, making it ideal for scenes with weak textures.{" "}
            </p>
            <p>
              Graph-Based SLAM techniques remain a cornerstone in robotics,
              focusing on constructing a graph of poses and constraints to
              optimize the robot's trajectory and environment representation.
              These methods are highly flexible and form the backend of many
              SLAM systems.{" "}
            </p>
          </section>
          <br />
          <section id="literature-3" className="subsection">
            <h3>3.3 SLAM for Aerial Robotics</h3>
            <p>
              SLAM algorithms have predominantly been evaluated on ground
              robots. Aerial applications pose a distinct set of challenges.
              High dynamics, vibration, and limited sensor placement affect the
              quality of SLAM input data. VINS-Mono and other visual-inertial
              SLAM systems have attempted to overcome this by fusing inertial
              data with visual cues. However, their performance remains tightly
              coupled to the quality of calibration and sensor fusion.{" "}
            </p>
          </section>
          <br />
          <section id="literature-4" className="subsection">
            <h3>3.4 Dataset and Simulations</h3>
            <p>
              The KITTI dataset has become a standard for evaluating visual SLAM
              algorithms, offering real-world driving sequences with stereo
              imagery and ground truth poses. While excellent for benchmarking,
              KITTI does not capture aerial motion characteristics. Thus,
              simulation environments like Webots and CoppeliaSim provide a
              vital testing ground for replicating drone dynamics and evaluating
              SLAM pipelines under more aerial-relevant conditions.{" "}
            </p>
            <p>
              This project builds upon the strengths of past research by
              combining static dataset evaluation with a simulated drone
              environment, helping close the gap between SLAM theory and
              practical deployment in autonomous drone systems.{" "}
            </p>
          </section>
        </section>
        <br />
        <section id="slam" className="section">
          <h2>4. SLAM Algorithms and KITTI Dataset</h2>
          <p>
            The SLAM algorithms chosen represent a diverse cross-section of
            popular approaches in the SLAM taxonomy. These include direct,
            feature-based, and learning-based methods. The following SLAM
            systems were studied:{" "}
          </p>
          <br />
          <section id="slam-1" className="subsection">
            <h3>4.1 ORB SLAM</h3>
            <p>
              <strong>Overview of ORB‑SLAM</strong>
            </p>
            <p>
              ORB‑SLAM is a complete monocular (or extendable to stereo/RGB-D)
              SLAM system that performs camera pose tracking and builds a sparse
              map of the environment using ORB features. It is organized into
              three main threads:
            </p>
            <ul>
              <li>
                <strong>Tracking:</strong> Extracts ORB features and estimates
                camera pose by matching them with local map features.
              </li>
              <li>
                <strong>Local Mapping:</strong> Selects new keyframes,
                triangulates map points, and applies local Bundle Adjustment.
              </li>
              <li>
                <strong>Loop Closing:</strong> Detects loop closures using a
                bag-of-words approach and optimizes the pose graph.
              </li>
            </ul>
            <p>
              <strong>Key References:</strong> Mur-Artal et al. (2015),
              Mur-Artal & Tardós (2017).
            </p>

            <p>
              <strong>Key Components of ORB‑SLAM</strong>
            </p>

            <p>
              <strong>a. Feature Extraction: ORB Features</strong>
            </p>

            <p>
              <strong>i. FAST Corner Detection</strong>
            </p>
            <p>
              FAST identifies corners by comparing a pixel’s intensity with its
              circular neighbors. A pixel <strong>p</strong> with intensity{" "}
              <strong>I(p)</strong> is considered a corner if a contiguous arc
              of surrounding pixels satisfies: <br></br>I(p<sub>i</sub>) &gt;
              I(p) + t or I(p<sub>i</sub>) &lt; I(p) - t
            </p>

            <p>
              <strong>ii. Orientation Assignment</strong>
            </p>
            <p>Orientation θ is calculated using intensity centroid method:</p>
            <p>
              θ = arctan(m<sub>01</sub> / m<sub>10</sub>)
            </p>
            <p>
              m<sub>10</sub> = ∑ x I(x, y), &nbsp; m<sub>01</sub> = ∑ y I(x, y)
            </p>

            <p>
              <strong>iii. Rotated BRIEF Descriptors</strong>
            </p>
            <p>ORB computes binary descriptors via pairwise intensity tests:</p>
            <p>
              τ(p;{" "}
              <strong>
                u<sub>1</sub>
              </strong>
              ,{" "}
              <strong>
                u<sub>2</sub>
              </strong>
              ) ={"{"}1 if I(p +{" "}
              <strong>
                u<sub>1</sub>
              </strong>
              ) &lt; I(p +{" "}
              <strong>
                u<sub>2</sub>
              </strong>
              ), 0 otherwise
              {"}"}
            </p>

            <p>
              <strong>b. Tracking</strong>
            </p>
            <p>
              Matches are found using Hamming distance. Pose is estimated using
              PnP with RANSAC:
            </p>
            <p>
              min
              <sub>
                <strong>R</strong>, <strong>t</strong>
              </sub>{" "}
              ∑<sub>i=1</sub>
              <sup>N</sup> || π(<strong>R</strong> <strong>X</strong>
              <sub>i</sub> + <strong>t</strong>) - <strong>x</strong>
              <sub>i</sub> ||<sup>2</sup>
            </p>

            <p>
              <strong>c. Local Mapping</strong>
            </p>
            <p>
              Keyframes are inserted based on motion thresholds. Local BA
              optimizes structure and pose:
            </p>
            <p>
              min
              <sub>
                <strong>T</strong>
                <sub>i</sub>, <strong>X</strong>
                <sub>j</sub>
              </sub>
              ∑<sub>i,j</sub> ρ(||<strong>x</strong>
              <sub>ij</sub> - π(<strong>T</strong>
              <sub>i</sub> <strong>X</strong>
              <sub>j</sub>)||<sup>2</sup>)
            </p>

            <p>
              <strong>d. Loop Closing</strong>
            </p>

            <p>
              <strong>i. Loop Detection via Bag-of-Words</strong>
            </p>
            <p>
              Keyframes are matched via histogram similarity of ORB feature
              words using BoW.
            </p>

            <p>
              <strong>ii. Pose Graph Optimization</strong>
            </p>
            <p>
              min
              <sub>
                <strong>T</strong>
                <sub>i</sub>
              </sub>
              ∑<sub>(i,j) ∈ ℰ</sub>
              ||log(<strong>T</strong>
              <sub>ij</sub>
              <sup>-1</sup> <strong>T</strong>
              <sub>i</sub>
              <sup>-1</sup> <strong>T</strong>
              <sub>j</sub>)||<sup>2</sup>
            </p>

            <p>
              <strong>Mathematical Underpinnings</strong>
            </p>

            <p>
              <strong>a. Corner Detection (FAST)</strong>
            </p>
            <p>
              Compares pixel I(p) to circle neighbors. If threshold condition is
              met over an arc, it's a corner.
            </p>

            <p>
              <strong>b. Orientation Assignment</strong>
            </p>
            <p>θ = arctan(∑ y I(x,y) / ∑ x I(x,y))</p>

            <p>
              <strong>c. Pose Estimation and Bundle Adjustment</strong>
            </p>
            <p>
              Pose <strong>R</strong> | <strong>t</strong> is estimated using:
            </p>
            <p>
              e<sub>ij</sub> = <strong>x</strong>
              <sub>ij</sub> - π(<strong>T</strong>
              <sub>i</sub> <strong>X</strong>
              <sub>j</sub>)
            </p>
            <p>
              min ∑<sub>i,j</sub> ρ(||e<sub>ij</sub>||<sup>2</sup>)
            </p>

            <p>
              <strong>d. Loop Closure Optimization</strong>
            </p>
            <p>
              e<sub>ij</sub> = log(<strong>T</strong>
              <sub>ij</sub>
              <sup>-1</sup> <strong>T</strong>
              <sub>i</sub>
              <sup>-1</sup> <strong>T</strong>
              <sub>j</sub>)
            </p>
          </section>
          <br></br>
          <section id="slam-2" className="subsection">
            <h3>4.2 Graph-Based Optimized SLAM</h3>
            <p>
              GTSAM is a widely used open-source C++ library designed for
              solving large-scale factor graph optimization problems, which
              makes it particularly well-suited for SLAM (Simultaneous
              Localization and Mapping) applications.
            </p>

            <h3>Overview</h3>

            <p>GTSAM formulates the SLAM problem as a factor graph, where:</p>
            <ul>
              <li>
                <strong>Nodes (Variables):</strong> Represent the unknowns in
                the system, such as robot poses (position and orientation) and
                landmark positions.
              </li>
              <li>
                <strong>Factors:</strong> Represent probabilistic constraints
                coming from sensor measurements (e.g., odometry, range, bearing)
                that relate these variables.
              </li>
            </ul>

            <p>
              The goal is to compute the most likely configuration of these
              variables (i.e., maximum a posteriori, or MAP estimate) given the
              noisy sensor data. GTSAM's strength comes from its ability to
              efficiently exploit the sparsity inherent in these problems and to
              perform both batch and incremental (real-time) optimization using
              advanced techniques like iSAM2.
            </p>

            <h3>Factor Graph Formulation in SLAM</h3>

            <h4>a. Setting Up the Problem</h4>

            <p>In a typical SLAM formulation using factor graphs, we denote:</p>
            <ul>
              <li>
                X = {"{x₁, x₂, ..., xₙ}"} as the set of state variables (e.g.,
                robot poses).
              </li>
              <li>
                L = {"{ℓ₁, ℓ₂, ..., ℓₘ}"} as the set of landmarks (if performing
                full SLAM).
              </li>
              <li>Z = {"{z₁, z₂, ..., zₖ}"} as a set of measurements.</li>
            </ul>

            <p>
              Each measurement z<sub>k</sub> relates certain variables (for
              instance, an odometry measurement relates x<sub>i</sub> and x
              <sub>i+1</sub>, or a landmark observation relates x<sub>i</sub> to
              ℓ<sub>j</sub>). These measurements are modeled as factors with
              associated probability density functions.
            </p>

            <h4>b. The MAP Estimation</h4>

            <p>The SLAM problem is cast as a MAP estimation problem:</p>
            <p>
              X*, L* = arg max<sub>X, L</sub> p(X, L | Z)
            </p>

            <p>
              Assuming independent measurement noise, the joint posterior
              decomposes into a product of factors:
            </p>
            <p>
              p(X, L | Z) ∝ ∏<sub>k</sub> φ<sub>k</sub>(X<sub>k</sub>, L
              <sub>k</sub>)
            </p>

            <p>
              where φ<sub>k</sub>(·) represents the likelihood (or factor)
              associated with measurement z<sub>k</sub> that depends on a subset
              of variables X<sub>k</sub> and possibly landmarks L<sub>k</sub>.
            </p>

            <p>
              To simplify the optimization, we typically take the negative
              logarithm, converting the product into a sum:
            </p>
            <p>{`{X*, L*} = arg minₓₗ Σₖ -log φₖ(Xₖ, Lₖ)`}</p>

            <p>
              When the measurement errors are assumed to be Gaussian, each
              factor can be expressed in a quadratic form:
            </p>
            <p>
              -log φ<sub>k</sub>(X<sub>k</sub>, L<sub>k</sub>) ∝ ||h<sub>k</sub>
              (X<sub>k</sub>, L<sub>k</sub>) - z<sub>k</sub>||<sub>Σk</sub>
              <sup>2</sup>
            </p>

            <p>where:</p>
            <ul>
              <li>
                h<sub>k</sub>(·) is the measurement prediction function,
              </li>
              <li>
                z<sub>k</sub> is the observed measurement,
              </li>
              <li>
                Σ<sub>k</sub> is the covariance (or information) matrix of the
                measurement, and
              </li>
              <li>
                || · ||<sub>Σ</sub>
                <sup>2</sup> denotes the Mahalanobis norm.
              </li>
            </ul>

            <p>
              The overall problem becomes a non-linear least-squares
              optimization problem.
            </p>

            <h3>Mathematical Underpinnings</h3>

            <h4>a. Non-Linear Optimization</h4>

            <p>
              GTSAM solves the optimization problem using iterative non-linear
              solvers such as Gauss–Newton or Levenberg–Marquardt. In each
              iteration, the non-linear functions are linearized around the
              current estimate. For a given factor with error function:
            </p>
            <p>
              e<sub>k</sub>(X<sub>k</sub>, L<sub>k</sub>) = h<sub>k</sub>(X
              <sub>k</sub>, L<sub>k</sub>) - z<sub>k</sub>
            </p>

            <p>
              the linearized approximation at an estimate θ<sub>0</sub>{" "}
              (comprising all relevant variables) is:
            </p>
            <p>
              e<sub>k</sub>(θ) ≈ e<sub>k</sub>(θ<sub>0</sub>) + J<sub>k</sub> (θ
              - θ<sub>0</sub>)
            </p>

            <p>
              where J<sub>k</sub> is the Jacobian of h<sub>k</sub> evaluated at
              θ<sub>0</sub>.
            </p>

            <p>
              The optimization then seeks to find the update δθ that minimizes:
            </p>
            <p>
              min<sub>δθ</sub> ∑<sub>k</sub> ||e<sub>k</sub>(θ<sub>0</sub>) + J
              <sub>k</sub> δθ||<sup>2</sup>
              <sub>Σk</sub>
            </p>

            <p>This leads to solving a system of linear equations:</p>
            <p>A δθ = b</p>

            <p>
              where A is the approximated Hessian matrix (often sparse) and b is
              the gradient vector. The sparsity pattern is exploited to compute
              the solution efficiently.
            </p>

            <h4>b. Factor Graph Representation</h4>

            <p>
              In a factor graph, nodes correspond to the variables (poses and
              landmarks) and factors represent the measurement constraints. The
              graph structure allows the optimization to be broken down into
              smaller subproblems, which is key to the efficiency of solvers
              like iSAM and iSAM2.
            </p>

            <h4>Incremental Smoothing and Mapping (iSAM2)</h4>
            <p>
              GTSAM includes incremental solvers such as iSAM2 which update the
              solution as new measurements are added without re-solving the
              entire problem from scratch. iSAM2 uses a Bayes tree data
              structure to manage the factor graph and update only the affected
              portions. This incremental approach is particularly valuable for
              real-time applications, as it improves both speed and
              responsiveness.
            </p>

            <h3>4. Loop Closure and Global Consistency</h3>

            <p>
              Although the basic formulation of GTSAM SLAM focuses on local
              measurements, it also efficiently handles loop closures. When a
              loop closure is detected, new constraints are introduced into the
              factor graph. The optimization process then adjusts the entire set
              of variables to enforce global consistency. This is achieved
              through the same optimization framework, where loop closure
              factors contribute additional terms in the cost function that the
              optimizer must satisfy.
            </p>
          </section>
          <br></br>
          <section id="slam-3" className="subsection">
            <h3>4.3 DROID SLAM</h3>
            <h3>Overview of DROID-SLAM</h3>

            <p>
              DROID-SLAM (Deep Recurrent Inference for Visual SLAM) is a modern,
              learning-based SLAM system that rethinks traditional visual SLAM
              pipelines by replacing hand-crafted feature extraction and pose
              estimation modules with deep neural networks. Its key
              characteristics include:
            </p>

            <ul>
              <li>
                <strong>End-to-End Differentiable Pipeline:</strong> Unlike
                classic systems that separate feature detection, matching, and
                optimization, DROID-SLAM formulates the entire SLAM problem in a
                differentiable manner. This permits learning from data and
                jointly optimizing all components.
              </li>
              <li>
                <strong>Recurrent Inference:</strong> The system employs a
                recurrent network (typically based on GRU or similar
                architectures) to iteratively update pose estimates and the
                corresponding map representation over time.
              </li>
              <li>
                <strong>Cost Volume and Learned Matching:</strong> Instead of
                relying solely on photometric error minimization or handcrafted
                descriptors, DROID-SLAM builds correlation cost volumes between
                images using deep features. These cost volumes enable a more
                robust association between frames, even under challenging
                appearance changes.
              </li>
              <li>
                <strong>Optimization in Lie Algebra Space:</strong> As in many
                SLAM systems, the updates for the camera pose are expressed in
                the tangent space of the transformation group (i.e., using Lie
                algebra representations), allowing smooth incremental updates
                via differentiable optimization layers.
              </li>
              <li>
                <strong>Global Consistency via Pose Graph Optimization:</strong>{" "}
                The integration of a global optimization stage, often achieved
                by incorporating pose graph techniques, ensures that drift is
                minimized when revisiting previously seen areas.
              </li>
            </ul>

            <p>
              A detailed description of the system can be found in the
              foundational paper (see reference below).
            </p>

            <h3>Core Components and Pipeline</h3>

            <h4>a. Deep Feature Extraction and Cost Volume Computation</h4>

            <h4>Feature Extraction</h4>
            <p>
              DROID-SLAM begins by processing incoming images through a
              convolutional neural network (CNN) that produces dense feature
              maps. These features are learned rather than hand-designed, and
              they capture both appearance and geometry cues relevant for
              matching.
            </p>

            <h4>Cost Volume Construction</h4>
            <p>
              Pairwise relationships between images (or keyframes) are computed
              by constructing a cost volume. For each pixel in one frame, the
              network calculates a similarity score (often via inner products or
              correlation measures) with features from another frame over a
              hypothesized set of correspondences. Mathematically, if F
              <sub>a</sub>(x) and F<sub>b</sub>(y) are feature descriptors at
              locations x and y in frames a and b, a cost volume C(x, y) might
              be obtained as:
            </p>

            <p>
              C(x, y) = ⟨F<sub>a</sub>(x), F<sub>b</sub>(y)⟩
            </p>

            <p>
              where ⟨·,·⟩ denotes an inner product. This provides a measure of
              similarity that will guide the association of pixels across
              frames.
            </p>

            <h4>b. Recurrent Pose and Map Inference</h4>

            <p>
              At the heart of DROID-SLAM is a recurrent network module that
              refines the pose estimates and the (implicit) map over multiple
              iterations. This module functions similarly to iterative
              optimization in classical non-linear least-squares but replaces
              explicit Jacobian computations with learned updates.
            </p>

            <h4>Differentiable Pose Update</h4>
            <p>
              The current estimate of a camera pose, typically represented as a
              transformation T ∈ SE(3), is updated through an incremental twist
              Δξ ∈ se(3) (the Lie algebra of SE(3)) as:
            </p>

            <p>
              T<sub>new</sub> = T<sub>old</sub> · exp(Δξ<sup>∧</sup>)
            </p>

            <p>
              where exp(·) is the exponential map from the Lie algebra to the
              Lie group, and (·)<sup>∧</sup> denotes the operator that converts
              vectorized parameters into their corresponding matrix
              representation. In DROID-SLAM, the network predicts Δξ based on
              the cost volume, the current state, and temporal context,
              effectively learning to "descent" on the cost landscape.
            </p>

            <h4>Recurrent Inference Loop</h4>
            <p>
              The recurrent module (e.g., implemented using GRUs) takes as input
              the current state (pose and potentially an implicit map
              representation), the computed cost volumes, and additional context
              (such as uncertainty estimates). Through several iterations, it
              refines the estimates by predicting incremental updates. This
              recurrent design allows the network to integrate information over
              time, handle challenging dynamic environments, and learn robust
              error corrections.
            </p>

            <h4>c. Differentiable Optimization</h4>

            <p>
              Instead of relying on classical Gauss–Newton or
              Levenberg–Marquardt routines with manually derived Jacobians,
              DROID-SLAM incorporates differentiable optimization layers that
              are integrated into the learning framework. In effect, the network
              is trained end-to-end to minimize a loss function that includes:
            </p>
            <ul>
              <li>
                A <strong>photometric or feature reprojection error</strong>{" "}
                over multiple frames,
              </li>
              <li>
                Regularization terms that encourage smoothness and consistency
                in pose and depth (or map) predictions.
              </li>
            </ul>

            <p>
              For a given frame correspondence, the error can be written as:
            </p>

            <p>
              E(Δξ) = Σ<sub>x∈Ω</sub> ρ(I(π(T<sub>old</sub> · exp(Δξ<sup>∧</sup>
              ) π<sup>-1</sup>(x, d(x)))) - I<sub>ref</sub>(x))<sup>2</sup>
            </p>

            <p>where:</p>
            <ul>
              <li>
                I and I<sub>ref</sub> denote the current and reference image
                intensities (or deep feature similarities),
              </li>
              <li>π(·) projects a 3D point onto image coordinates,</li>
              <li>
                d(x) is an estimated (or learned) depth or inverse-depth at
                pixel x,
              </li>
              <li>ρ is a robust loss function (e.g., Huber loss).</li>
            </ul>

            <p>
              The network is trained to produce updates Δξ that minimize this
              error across the sequence, with gradients propagated through the
              entire differentiable pipeline.
            </p>

            <h4>d. Global Map Consistency</h4>

            <p>
              To ensure that the trajectory remains consistent over long
              sequences, DROID-SLAM incorporates a global pose graph
              optimization layer. When loop closures are detected (i.e., when
              the network recognizes that the camera has revisited a previously
              seen area), additional constraints are added to the factor graph.
              The optimization problem in the global pose graph takes the form:
            </p>

            <p>
              min
              <sub>
                T<sub>i</sub>
              </sub>{" "}
              Σ<sub>(i,j)∈ℰ</sub> ||log(T<sub>ij</sub>
              <sup>-1</sup> T<sub>i</sub>
              <sup>-1</sup> T<sub>j</sub>)||<sup>2</sup>
            </p>

            <p>
              where T<sub>ij</sub> represents the measured relative
              transformation between keyframes i and j, and the logarithm maps
              the residual from SE(3) to its Lie algebra se(3). This stage
              further refines the poses globally to mitigate accumulated drift.
            </p>

            <h3>Mathematical Underpinnings</h3>

            <h4>a. Lie Groups and Differentiable Updates</h4>

            <p>
              As with many SLAM systems, camera poses in DROID-SLAM are modeled
              as elements of SE(3). The use of Lie algebra enables the
              formulation of incremental updates:
            </p>

            <p>
              Δξ ∈ ℝ<sup>6</sup>, T ← T · exp(Δξ<sup>∧</sup>)
            </p>

            <p>
              The exponential map translates small perturbations from the
              tangent space to the manifold, and the learned network predicts
              the most effective Δξ based on the current cost volume.
            </p>

            <h4>b. Learned Cost Function and Recurrent Refinement</h4>

            <p>
              The learned cost volume encapsulates the similarity between
              features across images. The recurrent module in DROID-SLAM updates
              the pose estimate via a learned descent direction rather than
              computing analytical Jacobians. In essence, the network replaces
              the classical role of:
            </p>

            <p>
              Δξ = -(J<sup>⊤</sup>J)<sup>-1</sup>J<sup>⊤</sup>e
            </p>

            <p>
              with a prediction that implicitly encodes the gradient and Hessian
              information of the photometric (or feature-based) error landscape.
              Over multiple iterations, the network converges on a low-error
              solution that aligns the images and reconstructs the 3D scene.
            </p>

            <h4>c. End-to-End Differentiability</h4>

            <p>
              One of the key mathematical insights in DROID-SLAM is that by
              making the entire pipeline differentiable—from feature extraction
              through cost volume computation to iterative pose updates—the
              system can be trained directly on SLAM tasks. The loss function
              typically combines:
            </p>
            <ul>
              <li>
                <strong>Reprojection errors:</strong> Encouraging consistency
                between the warped images and the reference images,
              </li>
              <li>
                <strong>Temporal consistency:</strong> Regularizing the pose
                trajectory,
              </li>
              <li>
                <strong>Uncertainty estimates:</strong> Optionally, additional
                losses that weight contributions based on predicted uncertainty.
              </li>
            </ul>

            <p>
              Backpropagation through differentiable optimization layers allows
              the network to learn optimal strategies for robust SLAM in a
              data-driven manner.
            </p>

            <h3>Advantages and Challenges</h3>

            <h4>Advantages</h4>

            <ul>
              <li>
                <strong>Robustness to Challenging Conditions:</strong> The
                learned cost volume and recurrent refinement help DROID-SLAM
                handle scenarios with motion blur, varying illumination, and
                low-texture regions.
              </li>
              <li>
                <strong>Data-Driven Inference:</strong> End-to-end training
                enables the system to discover representations and optimization
                strategies that are well-suited to the data, potentially
                surpassing classical heuristics.
              </li>
              <li>
                <strong>Efficient Temporal Integration:</strong> The recurrent
                architecture effectively integrates temporal information across
                frames, improving pose accuracy over long sequences.
              </li>
            </ul>

            <h4>Challenges</h4>

            <ul>
              <li>
                <strong>Training Data Requirements:</strong> End-to-end learning
                requires significant training data (often from synthetic or
                real-world sequences) to cover various scenarios.
              </li>
              <li>
                <strong>Computational Demands:</strong> While inference is
                optimized for speed, the deep network components demand modern
                hardware (e.g., GPUs) to run in real time.
              </li>
              <li>
                <strong>Interpretability:</strong> Replacing classical
                analytical methods with learned modules can make the system less
                transparent in terms of understanding failure modes or the exact
                contribution of individual components.
              </li>
            </ul>
          </section>
          <br></br>
          <section id="slam-4" className="subsection">
            <h3>4.4 LSD SLAM</h3>
            <h3>1. Overview of LSD-SLAM</h3>

            <p>
              LSD-SLAM is a direct, monocular SLAM system that differs from
              traditional feature-based approaches by operating directly on
              pixel intensities rather than extracted features. Its main
              characteristics include:
            </p>

            <ul>
              <li>
                <strong>Direct Image Alignment:</strong> LSD-SLAM computes
                camera motion by minimizing the photometric error between
                consecutive images or keyframes.
              </li>
              <li>
                <strong>Semi-Dense Mapping:</strong> Instead of creating a
                sparse point cloud, the system builds semi-dense depth maps on
                keyframes by estimating depth only on regions with sufficient
                intensity gradients.
              </li>
              <li>
                <strong>Scale and Global Map:</strong> It is designed for
                large-scale environments and can reconstruct maps in real-time,
                taking advantage of the direct formulation to handle large
                scenes.
              </li>
              <li>
                <strong>Keyframe-Based Operation:</strong> Similar to many SLAM
                methods, LSD-SLAM uses keyframes for both tracking and mapping,
                adding new keyframes when sufficient motion or change is
                observed.
              </li>
            </ul>

            <p>
              <strong>Key Reference:</strong>
            </p>
            <p>
              Engel, J., Schöps, T., & Cremers, D. (2014).{" "}
              <em>LSD-SLAM: Large-Scale Direct Monocular SLAM</em>. In ECCV.
            </p>

            <h3>2. Direct Image Alignment</h3>

            <h4>a. Photometric Error Minimization</h4>

            <p>
              Instead of extracting and matching visual features, LSD-SLAM
              relies on aligning image intensities. For two images (a reference
              image I<sub>ref</sub> and a current image I), the alignment is
              performed by warping one image into the coordinate frame of the
              other based on an estimated transformation.
            </p>

            <p>The core objective is to minimize the photometric error:</p>
            <p>
              E(ξ) = ∑<sub>x∈Ω</sub> ρ(I(w(x, d(x), ξ)) - I<sub>ref</sub>(x))
              <sup>2</sup>
            </p>

            <p>where:</p>
            <ul>
              <li>
                x ∈ Ω are pixel locations (typically in regions with significant
                gradients),
              </li>
              <li>
                I<sub>ref</sub>(x) is the intensity at pixel x in the reference
                keyframe,
              </li>
              <li>d(x) is the estimated inverse depth at pixel x,</li>
              <li>
                ξ ∈ se(3) is the camera motion parameterized as a transformation
                (rotation and translation in 3D),
              </li>
              <li>
                w(x, d(x), ξ) warps the pixel x from the reference frame to the
                current frame using the estimated depth and transformation,
              </li>
              <li>
                ρ(·) is a robust loss function (e.g., Huber or Tukey) that
                down-weights outliers.
              </li>
            </ul>

            <p>
              The warping function w involves projecting the 3D point
              reconstructed from x in the reference frame into the current
              frame:
            </p>
            <ol>
              <li>
                <p>
                  <strong>Back-Projection:</strong> Given the pixel x = (u, v)
                  and its inverse depth d, the 3D point X is computed using the
                  camera intrinsic parameters K:
                </p>
                <p>
                  X = π<sup>-1</sup>(x, d) = (1/d)K<sup>-1</sup>(u,v,1)
                  <sup>T</sup>
                </p>
              </li>
              <li>
                <p>
                  <strong>Transformation:</strong> This 3D point is then
                  transformed into the current camera frame:
                </p>
                <p>X' = T(ξ) · X</p>
                <p>
                  where T(ξ) ∈ SE(3) is the transformation matrix corresponding
                  to the motion estimate.
                </p>
              </li>
              <li>
                <p>
                  <strong>Projection:</strong> Finally, X' is projected back
                  into image coordinates:
                </p>
                <p>x' = π(X') = K · (X'/z')</p>
                <p>with z' being the depth (third coordinate) of X'.</p>
              </li>
            </ol>

            <h4>b. Jacobian and Optimization</h4>

            <p>
              To optimize E(ξ), a non-linear least-squares solver (e.g.,
              Gauss–Newton or Levenberg–Marquardt) is employed. Linearization of
              the error around an estimate ξ<sub>0</sub> is obtained via a
              first-order Taylor expansion:
            </p>
            <p>
              I(w(x, d(x), ξ)) ≈ I(w(x, d(x), ξ<sub>0</sub>)) + J(x) · Δξ
            </p>

            <p>where:</p>
            <ul>
              <li>
                J(x) is the Jacobian of the warped intensity with respect to the
                transformation parameters,
              </li>
              <li>
                Δξ = ξ - ξ<sub>0</sub> is the update in the tangent space of
                SE(3).
              </li>
            </ul>

            <p>The overall system is thus reduced to solving:</p>
            <p>
              min<sub>Δξ</sub> ∑<sub>x∈Ω</sub> ||I(w(x, d(x), ξ<sub>0</sub>)) +
              J(x)Δξ - I<sub>ref</sub>(x)||<sup>2</sup>
            </p>

            <p>
              Due to the high dimensionality and non-linear nature of the
              problem, careful treatment of the Jacobians and selection of
              pixels (semi-dense regions) leads to computational efficiency
              without sacrificing accuracy.
            </p>

            <h3>3. Semi-Dense Depth Estimation</h3>

            <h4>a. Inverse Depth Parameterization</h4>

            <p>
              LSD-SLAM uses an inverse depth parameterization for each pixel in
              a keyframe with sufficient gradient:
            </p>
            <p>d = 1/z</p>

            <p>
              where z is the actual depth. This representation tends to be more
              linear for distant points and helps in avoiding numerical
              instabilities during optimization.
            </p>

            <h4>b. Depth Map Update</h4>

            <p>
              When a new keyframe is created, an initial depth map is estimated
              using multi-view stereo information from the motion between
              keyframes. As more images are processed, the depth for each pixel
              is refined by integrating multiple observations using
              probabilistic fusion techniques. This not only increases the
              robustness of depth estimation but also helps in building a
              consistent semi-dense reconstruction of the environment.
            </p>

            <p>
              The fusion of depth measurements often follows a Bayesian update
              scheme, where the probability distribution of the inverse depth
              for a pixel is updated with new measurements. This can be
              summarized as:
            </p>
            <p>
              p(d | I<sub>1</sub>, I<sub>2</sub>, ...) ∝ p(I<sub>k</sub> | d) ·
              p(d | I<sub>1</sub>, ..., I<sub>k-1</sub>)
            </p>

            <p>
              where p(I<sub>k</sub> | d) represents the likelihood of the new
              measurement given a particular depth hypothesis.
            </p>

            <h3>4. Loop Closure and Global Consistency</h3>

            <h4>a. Pose Graph Construction</h4>

            <p>
              Similar to other SLAM frameworks, LSD-SLAM maintains a pose graph
              where:
            </p>
            <ul>
              <li>
                <strong>Nodes:</strong> Represent the keyframe poses.
              </li>
              <li>
                <strong>Edges:</strong> Encode the relative transformations
                obtained through direct image alignment.
              </li>
            </ul>

            <p>
              When the system detects that the camera revisits a previously
              mapped area, loop closure constraints are added to the graph.
              These constraints are used to correct accumulated drift.
            </p>

            <h4>b. Global Optimization</h4>

            <p>
              Once loop closures are detected, a global pose graph optimization
              is performed, typically using methods such as non-linear
              optimization over SE(3). The optimization minimizes the error
              defined by the discrepancy between the predicted and measured
              relative transformations between keyframes:
            </p>
            <p>
              min
              <sub>
                T<sub>i</sub>
              </sub>{" "}
              ∑<sub>(i,j)∈ε</sub> ||log(T<sub>ij</sub>
              <sup>-1</sup> T<sub>i</sub>
              <sup>-1</sup> T<sub>j</sub>)||<sup>2</sup>
            </p>

            <p>
              Here, T<sub>ij</sub> is the relative transformation observed
              between keyframes i and j and the logarithm maps the
              transformation error from the manifold SE(3) to its Lie algebra.
            </p>

            <h3>5. Advantages and Considerations</h3>

            <h4>Advantages</h4>

            <ul>
              <li>
                <strong>Dense Intensity Utilization:</strong> By directly using
                pixel intensities, LSD-SLAM can operate in environments where
                feature-based methods might struggle (e.g., low-texture
                regions).
              </li>
              <li>
                <strong>Semi-Dense Reconstruction:</strong> Provides richer
                scene understanding than sparse SLAM methods while avoiding the
                computational cost of full dense reconstructions.
              </li>
              <li>
                <strong>Real-Time Performance:</strong> The selective use of
                high-gradient pixels and efficient direct methods allow LSD-SLAM
                to work in real time on modern hardware.
              </li>
            </ul>

            <h4>Considerations</h4>

            <ul>
              <li>
                <strong>Brightness Constancy Assumption:</strong> LSD-SLAM
                assumes that the brightness of a point remains constant between
                frames, which may not hold under varying illumination
                conditions.
              </li>
              <li>
                <strong>Computation of Photometric Jacobians:</strong> Accurate
                Jacobian computation is critical; inaccuracies can lead to
                divergence in the optimization.
              </li>
              <li>
                <strong>Initialization:</strong> Like many monocular systems,
                scale cannot be directly recovered and must be initialized
                carefully or fixed through additional constraints.
              </li>
            </ul>
          </section>
          <br />
          <section id="slam-5" className="subsection">
            <h3>4.5 KITTI Dataset</h3>
            <p>
              The KITTI Odometry Dataset is a benchmark dataset widely used in
              robotics and computer vision research for evaluating Simultaneous
              Localization and Mapping (SLAM) and visual odometry (VO)
              algorithms. It is part of the larger KITTI Vision Benchmark Suite
              developed by the Karlsruhe Institute of Technology and the Toyota
              Technological Institute at Chicago.
            </p>
            <p>
              <h3>Features: </h3>
            </p>
            <li>
              <strong>Sensor Setup:</strong> The dataset includes stereo
              grayscale and RGB images, 3D point clouds from a Velodyne HDL-64E
              LiDAR, GPS/IMU data, and accurate ground truth trajectories
              (provided by GPS/INS).
            </li>
            <li>
              <strong>Sequences:</strong> The odometry benchmark consists of 22
              sequences captured while driving around urban, rural, and highway
              environments in Karlsruhe, Germany.
            </li>
            <li>Sequences 00–10 come with ground truth trajectories.</li>
            <li>
              Sequences 11–21 are provided without ground truth for testing and
              benchmarking purposes.
            </li>
            <li>
              <strong>Camera Calibration:</strong> Intrinsic and extrinsic
              calibration parameters are provided for accurate sensor fusion and
              3D reconstruction.
            </li>
          </section>
        </section>
        <br />
        <section id="methodology" className="section">
          <h2>5. Methodology & Implementation</h2>

          <section id="methodology-1" className="subsection">
            <h3>5.1 SLAM</h3>
            <p>
              This project explores the capabilities of four prominent SLAM
              (Simultaneous Localization and Mapping) algorithms: ORB-SLAM,
              Graph-Based Optimized SLAM (GTSAM), LSD-SLAM, and DROID-SLAM. Each
              of these techniques presents a unique approach to solving the SLAM
              problem, combining visual input with motion estimation to
              reconstruct trajectories and environments. The SLAM systems were
              implemented in Python and integrated with both real-world and
              simulated data sources to assess their performance and robustness.
            </p>
          </section>
          <br />
          <section id="methodology-2" className="subsection">
            <h3>5.2 Dataset Benchmarking</h3>
            <p>
              To evaluate the real-world effectiveness of the selected SLAM
              algorithms, we used the KITTI Odometry Benchmark—specifically,
              sequence 00. This dataset provides ground-truth poses and stereo
              image data suitable for assessing visual odometry systems. Each
              algorithm was applied to the dataset, and performance was measured
              in terms of trajectory accuracy, drift, and overall robustness
              under varying motion and scene complexities. This benchmarking
              step provided a baseline understanding of how each SLAM method
              performs under real-world conditions.
            </p>
          </section>
          <br />
          <section id="methodology-3" className="subsection">
            <h3>5.3 WEBOTS Simulation</h3>
            <p>
              Following the dataset benchmarking, the same SLAM algorithms were
              evaluated in a custom-built simulation environment created in
              Webots. This environment includes a drone (DJI Mavic 2 PRO)
              equipped with a forward-facing camera and a maze-like indoor
              layout designed to stress-test SLAM in controlled yet challenging
              scenarios. Image and pose data were logged during simulated
              flights, and the SLAM pipelines were applied to this data to
              evaluate how well each algorithm performs in a simulation, where
              sensor noise and environmental constraints can be manipulated.
            </p>
          </section>
          <br />
          <section id="methodology-4" className="subsection">
            <h3>5.4 Analysis Techniques</h3>
            <p>
              The results from both real-world and simulated evaluations were
              analyzed using trajectory comparison metrics such as Absolute
              Trajectory Error (ATE) and Relative Pose Error (RPE). Visual
              overlays of estimated versus ground truth paths were also
              generated to provide intuitive insights into each algorithm's
              performance. Through this two-stage analysis, we gained a
              comprehensive understanding of the strengths and limitations of
              each SLAM system in diverse operational conditions.
            </p>
          </section>
        </section>
        <br />
        <section id="results" className="section">
          <h2>6. Results and Discussion</h2>
          <p>
            The below is the benchmark results gotten for each SLAM algorithm
            done on the Kitti-Odometry Dataset. All the algorithms were run on
            Kaggle notebooks.
            <img src={resultImage} alt="result" />
          </p>
          <br />
          <section id="results-1" className="subsection">
            <h3>6.1 ORB SLAM</h3>
            <img src={orbImage} alt="" />
            <p>
              <h4>Trajectory Analysis</h4>
            </p>
            <ul>
              <li>
                <p>
                  The estimated trajectory diverges noticeably from the ground
                  truth path, particularly at turns and long straight stretches.
                </p>
              </li>
              <li>
                <p>
                  There’s a persistent lateral drift, and the path appears
                  offset from the actual route.
                </p>
              </li>
              <li>
                <p>
                  No evidence of loop closure or global adjustment, leading to
                  cumulative drift.
                </p>
              </li>
            </ul>
            <p>
              <h4>Performance Metrics</h4>
            </p>
            <ul>
              <li>
                <p>ATE = 552.018 m → Shows significant deviation over time.</p>
              </li>
              <li>
                <p>
                  Drift = 11.43% → Consistent with cumulative uncorrected pose
                  errors.
                </p>
              </li>
              <li>
                <p>
                  RPE = 0.3121 m → Still shows reasonable short-term
                  consistency.
                </p>
              </li>
              <li>
                <p>
                  Time: 8m 8s, Memory: 4.1 GB → Resource-intensive due to
                  continuous feature extraction and matching.
                </p>
              </li>
            </ul>
          </section>
          <br />
          <section id="results-2" className="subsection">
            <h3>6.2 Graph based Optimized SLAM</h3>
            <img src={graphImage} alt="" />
            <p>
              <h4>Trajectory Analysis</h4>
            </p>
            <ul>
              <li>
                <p>
                  The estimated path nearly overlaps the ground truth throughout
                  the entire trajectory.
                </p>
              </li>
              <li>
                <p>
                  Sharp turns, loops, and straight-line movements are all
                  reconstructed with minimal error.
                </p>
              </li>
              <li>
                <p>Exhibits clear loop closure and trajectory correction.</p>
              </li>
            </ul>
            <p>
              <h4>Performance Metrics</h4>
            </p>
            <ul>
              <li>
                <p>ATE = 7.08 m → Near-perfect trajectory accuracy.</p>
              </li>
              <li>
                <p>
                  Drift = 1.25% → Shows high resilience to pose estimation
                  errors.
                </p>
              </li>
              <li>
                <p>
                  RPE = 0.4510 m → Slightly higher due to frequent
                  re-optimization steps.
                </p>
              </li>
              <li>
                <p>
                  Time: 29s, Memory: 4.4 GB → Fast but memory-heavy due to full
                  graph construction and factor updates.
                </p>
              </li>
            </ul>
          </section>
          <br />
          <section id="results-3" className="subsection">
            <h3>6.3 DROID SLAM</h3>
            <img src={droidImage} alt="" />
            <p>
              <h4>Trajectory Analysis</h4>
            </p>
            <ul>
              <li>
                <p>
                  Estimated trajectory maintains correct curvature, turns, and
                  motion flow but is spatially displaced from ground truth.
                </p>
              </li>
              <li>
                <p>
                  The path closely mirrors the shape of the real trajectory,
                  indicating strong relative estimation, but lacks global
                  alignment.
                </p>
              </li>
              <li>
                <p>No visible signs of loop closure or scale correction.</p>
              </li>
            </ul>
            <p>
              <h4>Performance Metrics</h4>
            </p>
            <ul>
              <li>
                <p>
                  ATE = 523.3325 m → Large drift due to lack of loop closure.
                </p>
              </li>
              <li>
                <p>
                  Drift = 11.739% → High due to cumulative trajectory offset.
                </p>
              </li>
              <li>
                <p>RPE = 0.2551 m → Excellent local motion estimation.</p>
              </li>
              <li>
                <p>
                  Time: 4m 31s, Memory: 3.1 GB → Moderate runtime; GPU
                  acceleration can reduce time further.
                </p>
              </li>
            </ul>
          </section>
          <br />
          <section id="results-4" className="subsection">
            <h3>6.4 LSD SLAM</h3>
            <img src={lsdImage} alt="" />
            <p>
              <h4>Trajectory Analysis</h4>
            </p>
            <ul>
              <li>
                <p>
                  The estimated trajectory preserves the general path structure
                  but is rotated and misaligned with the ground truth.
                </p>
              </li>
              <li>
                <p>No evidence of global scale correction or drift recovery.</p>
              </li>
              <li>
                <p>
                  Appears internally consistent, indicating stable relative pose
                  tracking.
                </p>
              </li>
            </ul>
            <p>
              <h4>Performance Metrics</h4>
            </p>
            <ul>
              <li>
                <p>
                  ATE = 322.739 m → Misalignment and rotation over long
                  distances.
                </p>
              </li>
              <li>
                <p>
                  Drift = 4.76% → Indicates absence of drift correction
                  mechanisms.
                </p>
              </li>
              <li>
                <p>
                  RPE = 0.2551 m → Strong short-term accuracy thanks to
                  intensity-based alignment.
                </p>
              </li>
              <li>
                <p>
                  Time: 3m 51s, Memory: 2.5 GB → Lightweight and faster due to
                  sparse map representation.
                </p>
              </li>
            </ul>
          </section>
        </section>
        <br />
        <section id="demo" className="section">
          <h2>7. Demo of Simulation</h2>
          <video src="/test4.mp4" controls className="video-responsive" />
        </section>
        <br />
        <section id="conclusion" className="section">
          <h2>8. Conclusion and Future Work</h2>
          <h3>Conclusion</h3>
          <p>
            Based on the trajectory analyses and performance metrics of the
            evaluated SLAM systems, it is evident that each algorithm exhibits
            distinct strengths and limitations. Algorithms with effective loop
            closure and global optimization mechanisms demonstrate superior
            global accuracy, as reflected by low ATE and drift values, even if
            they incur slightly higher RPE due to frequent re-optimizations.{" "}
          </p>
          <p>
            In contrast, methods lacking loop closure tend to suffer from
            cumulative drift and misalignment over time, despite showcasing
            strong short-term consistency through low RPE. Memory consumption
            and execution time also vary significantly, with sparse and
            intensity-based approaches being more lightweight and faster, while
            full graph-based systems offer higher accuracy at the cost of
            computational resources. Overall, the results highlight the
            trade-offs between local accuracy, global consistency, runtime
            efficiency, and memory usage in SLAM system design.
          </p>
          <h3>Future Work</h3>
          <p>
            The above project has been done by using 4 different algorithms
            separately. In the future, the algorithms can be combined such that
            there will be much lesser drift compared to taking the algorithms
            separately. We can also make the SLAM algorithms use much less
            features for mapping. The algorithms can be optimized much further
            such that it can be used in actual drones.
          </p>
        </section>
        <br />
        <section id="references" className="section">
          <h2>9. References</h2>
          <div className="references">
            <p>
              Teed, Z., & Deng, J. "DROID-SLAM: Deep Visual SLAM for Monocular,
              Stereo, and RGB-D Cameras." IEEE International Conference on
              Robotics and Automation (ICRA), 2021.
            </p>
            <p>
              Engel, J., Schöps, T., & Cremers, D. "LSD-SLAM: Large-scale direct
              monocular SLAM." European Conference on Computer Vision (ECCV),
              2014.
            </p>
            <p>
              Dissanayake, G., et al. "A solution to the simultaneous
              localization and map building (SLAM) problem." IEEE Transactions
              on Robotics and Automation, 2001.
            </p>
            <p>
              Mur-Artal, R., Montiel, J. M. M., & Tardós, J. D. "ORB-SLAM: a
              versatile and accurate monocular SLAM system." IEEE Transactions
              on Robotics, 2015.
            </p>
            <p>
              Montemerlo, M., et al. "FastSLAM: A factored solution to the
              simultaneous localization and mapping problem." Proceedings of the
              AAAI National Conference on Artificial Intelligence, 2002.
            </p>
            <p>
              Geiger, A., Lenz, P., & Urtasun, R. "Are we ready for Autonomous
              Driving? The KITTI Vision Benchmark Suite." IEEE Conference on
              Computer Vision and Pattern Recognition (CVPR), 2012.
            </p>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="report-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Comparitive Study of SLAM Algorithms for Drone Navigation</h1>
        </div>
        <nav className="toc-container">{renderTOC(sections)}</nav>
      </div>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default App;
