---
title: setup llama2 on local
tags:
  - ai
---

## Download model

1. from official site https://ai.meta.com/resources/models-and-libraries/llama-downloads/
2. fill above form, meta will send a email to you

![official llama2 models](/assets/images/official-llama2-models.png)


1. email will guide you go to https://github.com/facebookresearch/llama, follow readme to download real model file

```bash
./download.sh
```

Enter unique custom url from email, then select which model to download, recommend 13b

## Download from hugging-face

https://huggingface.co/meta-llama/Llama-2-13b/tree/main

## Convert raw model file

1. clone https://github.com/ggerganov/llama.cpp

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# convert raw llama-2 model, assume llama-2-7b is your download dir
python convert.py /Volumes/mac/repos/llama/llama-2-7b/
```

![convert-llama-7b](/assets/images/conv-llama-7b.png)

Then will generate a bin file

![gen-llama-bin-file](/assets/images/gen-llama-bin-file.png)

1. Quantize bin file, remember quantize will loss quality, so choose right quantize type

```bash
$ ./quantize -h
usage: ./quantize [--help] [--allow-requantize] [--leave-output-tensor] model-f32.bin [model-quant.bin] type [nthreads]

  --allow-requantize: Allows requantizing tensors that have already been quantized. Warning: This can severely reduce quality compared to quantizing from 16bit or 32bit
  --leave-output-tensor: Will leave output.weight un(re)quantized. Increases model size but may also increase quality, especially when requantizing

Allowed quantization types:
   2  or  Q4_0   :  3.50G, +0.2499 ppl @ 7B - small, very high quality loss - legacy, prefer using Q3_K_M
   3  or  Q4_1   :  3.90G, +0.1846 ppl @ 7B - small, substantial quality loss - legacy, prefer using Q3_K_L
   8  or  Q5_0   :  4.30G, +0.0796 ppl @ 7B - medium, balanced quality - legacy, prefer using Q4_K_M
   9  or  Q5_1   :  4.70G, +0.0415 ppl @ 7B - medium, low quality loss - legacy, prefer using Q5_K_M
  10  or  Q2_K   :  2.67G, +0.8698 ppl @ 7B - smallest, extreme quality loss - not recommended
  12  or  Q3_K   : alias for Q3_K_M
  11  or  Q3_K_S :  2.75G, +0.5505 ppl @ 7B - very small, very high quality loss
  12  or  Q3_K_M :  3.06G, +0.2437 ppl @ 7B - very small, very high quality loss
  13  or  Q3_K_L :  3.35G, +0.1803 ppl @ 7B - small, substantial quality loss
  15  or  Q4_K   : alias for Q4_K_M
  14  or  Q4_K_S :  3.56G, +0.1149 ppl @ 7B - small, significant quality loss
  15  or  Q4_K_M :  3.80G, +0.0535 ppl @ 7B - medium, balanced quality - *recommended*
  17  or  Q5_K   : alias for Q5_K_M
  16  or  Q5_K_S :  4.33G, +0.0353 ppl @ 7B - large, low quality loss - *recommended*
  17  or  Q5_K_M :  4.45G, +0.0142 ppl @ 7B - large, very low quality loss - *recommended*
  18  or  Q6_K   :  5.15G, +0.0044 ppl @ 7B - very large, extremely low quality loss
   7  or  Q8_0   :  6.70G, +0.0004 ppl @ 7B - very large, extremely low quality loss - not recommended
   1  or  F16    : 13.00G              @ 7B - extremely large, virtually no quality loss - not recommended
   0  or  F32    : 26.00G              @ 7B - absolutely huge, lossless - not recommended
```

I choose q5_k_s (16)

```bash
./quantize /Volumes/mac/repos/llama/llama-2-7b/ggml-model-f32.bin /Volumes/mac/ai-models/llama-2-7b-ggml-q5-k-s.bin q5_k_s
```

![quant-llama-bin](/assets/images/quant-llama-bin.png)


## Run llama-2

```bash
./main -m /Volumes/mac/ai-models/llama-2-7b-ggml-q5-k-s.bin  -ngl 4 -p 'what is langchain' --color -ins
```

## Reference

1. https://huggingface.co/TheBloke/Llama-2-7B-GGML