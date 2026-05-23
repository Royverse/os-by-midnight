---
description: "Workflow to build a minimal 64-bit kernel from scratch"
---

# Build Custom Kernel (Manual)

This workflow compiles a bare-metal kernel using a cross-compiler.

## Prerequisites
- WSL2 or Linux VM
- `x86_64-elf-gcc` and `x86_64-elf-ld` (Cross-Compiler)
- `nasm` (Assembler)
- `grub-mkrescue` (ISO creation)
- `xorriso`

## 1. Setup Environment
```bash
# Install dependencies
sudo apt update
sudo apt install build-essential bison flex libgmp3-dev libmpc-dev libmpfr-dev texinfo nasm mtools xorriso grub-pc-bin grub-common
```

## 2. Compile Kernel Objects
```bash
# Assemble boot stub
nasm -f elf64 src/arch/x86_64/boot.asm -o build/boot.o

# Compile C kernel
x86_64-elf-gcc -c src/kernel/main.c -o build/kernel.o -std=gnu99 -ffreestanding -O2 -Wall -Wextra
```

## 3. Link Kernel
```bash
x86_64-elf-ld -n -o build/kernel.bin -T src/linker.ld build/boot.o build/kernel.o
```

## 4. check Multiboot Header
```bash
if grub-file --is-x86-multiboot2 build/kernel.bin; then
  echo "Multiboot Confirmed"
else
  echo "Multiboot Failed"
fi
```

## 5. Create ISO
```bash
mkdir -p build/isofiles/boot/grub
cp build/kernel.bin build/isofiles/boot/kernel.bin
cp src/arch/x86_64/grub.cfg build/isofiles/boot/grub/
grub-mkrescue -o build/os.iso build/isofiles
```

## 6. Run in QEMU
```bash
qemu-system-x86_64 -cdrom build/os.iso
```
