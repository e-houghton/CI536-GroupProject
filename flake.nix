{
  # TODO: Test if this even works.
  # TODO: Swap this out for simpler nix shell?
  
  description = "Java Spring dev flake for CI536";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, ... }: {
    devShells.x86_64-linux.default = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
      pkgs.mkShell {
        buildInputs = with pkgs; [
          gcc
          jdk21
          maven
          spring-boot-cli
        ];
        shellHook = ''
          echo ""
          echo "Java version: $(java -version 2>&1 | head -n 1)"
          echo "Maven version: $(mvn -version | head -n 1)"
          echo "Spring Boot CLI: $(spring --version)"
          echo ""
        '';
      };
  };
}
