'use client';

interface Branch {
  x: number;
  y: number;
  size: number;
  angle: number;
  depth: number;
}

export function PythagoreanTree() {
  const branches: Branch[] = [];
  const maxDepth = 10;
  
  function generateBranches(x: number, y: number, size: number, angle: number, depth: number) {
    if (depth > maxDepth || size < 2) return;
    
    branches.push({ x, y, size, angle, depth });
    
    const nextSize = size * 0.7;
    const branchAngle = 45;
    
    // Left branch
    const leftAngle = angle - branchAngle;
    const leftX = x + Math.sin((angle * Math.PI) / 180) * size;
    const leftY = y - Math.cos((angle * Math.PI) / 180) * size;
    generateBranches(leftX, leftY, nextSize, leftAngle, depth + 1);
    
    // Right branch
    const rightAngle = angle + branchAngle;
    const rightX = x + Math.sin((angle * Math.PI) / 180) * size;
    const rightY = y - Math.cos((angle * Math.PI) / 180) * size;
    generateBranches(rightX, rightY, nextSize, rightAngle, depth + 1);
  }
  
  // Generate the tree from bottom center
  generateBranches(200, 380, 60, 0, 0);
  
  return (
    <svg 
      viewBox="0 0 400 400" 
      className="w-full h-full"
      aria-label="Pythagorean tree illustration"
    >
      <defs>
        <linearGradient id="treeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" className="[stop-color:var(--swiss-black)] dark:[stop-color:white]" stopOpacity="1" />
          <stop offset="100%" className="[stop-color:var(--swiss-black)] dark:[stop-color:white]" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {branches.map((branch, i) => {
        const opacity = 1 - (branch.depth / maxDepth) * 0.7;
        return (
          <rect
            key={i}
            x={branch.x - branch.size / 2}
            y={branch.y - branch.size}
            width={branch.size}
            height={branch.size}
            fill="url(#treeGradient)"
            opacity={opacity}
            transform={`rotate(${branch.angle} ${branch.x} ${branch.y})`}
            className="transition-all duration-300"
          />
        );
      })}
    </svg>
  );
}
